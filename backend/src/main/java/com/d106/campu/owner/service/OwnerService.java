package com.d106.campu.owner.service;

import com.d106.campu.auth.constant.RoleName;
import com.d106.campu.auth.exception.code.AuthExceptionCode;
import com.d106.campu.campsite.domain.jpa.Campsite;
import com.d106.campu.campsite.domain.jpa.CampsiteFclty;
import com.d106.campu.campsite.domain.jpa.CampsiteTheme;
import com.d106.campu.campsite.domain.jpa.Fclty;
import com.d106.campu.campsite.domain.jpa.Theme;
import com.d106.campu.campsite.dto.CampsiteDto;
import com.d106.campu.campsite.dto.CampsiteDto.Response;
import com.d106.campu.campsite.exception.code.CampsiteExceptionCode;
import com.d106.campu.campsite.mapper.CampsiteMapper;
import com.d106.campu.campsite.repository.jpa.CampsiteFcltyRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteRepository;
import com.d106.campu.campsite.repository.jpa.CampsiteThemeRepository;
import com.d106.campu.campsite.repository.jpa.FcltyRepository;
import com.d106.campu.campsite.repository.jpa.ThemeRepository;
import com.d106.campu.common.exception.ConflictException;
import com.d106.campu.common.exception.NotFoundException;
import com.d106.campu.common.exception.UnauthorizedException;
import com.d106.campu.common.util.SecurityHelper;
import com.d106.campu.image.service.ImageService;
import com.d106.campu.owner.dto.OwnerDto.CampsiteUpdateRequest;
import com.d106.campu.owner.dto.OwnerDto.RoomCreateRequest;
import com.d106.campu.owner.dto.OwnerDto.RoomUpdateRequest;
import com.d106.campu.owner.exception.code.OwnerExceptionCode;
import com.d106.campu.reservation.dto.ReservationDto;
import com.d106.campu.reservation.repository.jpa.QReservationRepository;
import com.d106.campu.room.domain.jpa.Room;
import com.d106.campu.room.exception.code.RoomExceptionCode;
import com.d106.campu.room.mapper.RoomMapper;
import com.d106.campu.room.repository.jpa.IndutyRepository;
import com.d106.campu.room.repository.jpa.RoomRepository;
import com.d106.campu.user.domain.jpa.User;
import com.d106.campu.user.exception.code.UserExceptionCode;
import com.d106.campu.user.repository.jpa.UserRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class OwnerService {

    private final ImageService imageService;
    private final CampsiteRepository campsiteRepository;
    private final CampsiteThemeRepository campsiteThemeRepository;
    private final ThemeRepository themeRepository;
    private final CampsiteFcltyRepository campsiteFcltyRepository;
    private final FcltyRepository fcltyRepository;
    private final RoomRepository roomRepository;
    private final IndutyRepository indutyRepository;
    private final CampsiteMapper campsiteMapper;
    private final RoomMapper roomMapper;
    private final UserRepository userRepository;
    private final QReservationRepository qReservationRepository;
    private final SecurityHelper securityHelper;

    @Transactional
    public void registerCampsite(String bizrno) {
        User user = getUser();
        Campsite campsite = getCampsiteByBizrno(bizrno);

        checkExistedOwner(campsite);

        user.changeRole(RoleName.OWNER);
        campsite.setUser(user);
    }

    @Transactional(readOnly = true)
    public Page<Response> getOwnerCampsiteList(Pageable pageable) {
        return campsiteRepository.findByUser(pageable, getOwnerUser()).map(campsiteMapper::toCampsiteListResponseDto);
    }

    @Transactional(readOnly = true)
    public List<ReservationDto.ResponseWithUser> getOwnerReservationListByCampsite(Long campsiteId, LocalDate date) {
        Campsite campsite = campsiteRepository.findById(campsiteId).orElseThrow(() -> new NotFoundException(
            CampsiteExceptionCode.CAMPSITE_NOT_FOUND));

        User user = getOwnerUser();
        checkOwner(user.getAccount(), campsite.getUser().getAccount());

        date = (date == null) ? LocalDate.now() : date;
        return qReservationRepository.findReservationListByCampsiteAndOwner(campsite, user, date);
    }

    /**
     * Regist a campsite.
     *
     * @param createRequestDto Campsite information.
     * @return Saved campsite information.
     * @throws NotFoundException     If not login status.
     * @throws UnauthorizedException If user does not have {@link RoleName#OWNER} role.
     */
    @Transactional
    public CampsiteDto.CreateResponse createCampsite(CampsiteDto.CreateRequest createRequestDto) throws NotFoundException {
        User user = getOwnerUser();

        Campsite campsite = campsiteMapper.toCampsite(createRequestDto);
        campsite.setUser(user);

        /* TODO: insert campsite location(coordinates), induty, etc. */

        return campsiteMapper.toCreateResponseDto(campsiteRepository.save(campsite));
    }

    @Transactional
    public void updateCampsiteDetail(CampsiteUpdateRequest updateRequestDto) {
        Campsite campsite = getCampsiteById(updateRequestDto.getCampsiteId());

        checkOwner(securityHelper.getLoginAccount(), campsite.getUser().getAccount());

        campsite.setIntro(updateRequestDto.getIntro());
        campsiteThemeRepository.deleteByCampsite(campsite);
        campsiteFcltyRepository.deleteByCampsite(campsite);

        // TODO : cascade refactor
        if (updateRequestDto.getThemeList() != null && !updateRequestDto.getThemeList().isEmpty()) {
            List<Theme> themeList = themeRepository.findByThemeStrIn(updateRequestDto.getThemeList());
            for (Theme theme : themeList) {
                campsiteThemeRepository.save(CampsiteTheme.builder()
                    .campsite(campsite)
                    .theme(theme)
                    .build());
            }
        }

        if (updateRequestDto.getFcltyList() != null && !updateRequestDto.getFcltyList().isEmpty()) {
            List<Fclty> fcltyList = fcltyRepository.findByFcltyStrIn(updateRequestDto.getFcltyList());
            for (Fclty fclty : fcltyList) {
                campsiteFcltyRepository.save(CampsiteFclty.builder()
                    .campsite(campsite)
                    .fclty(fclty)
                    .build());
            }
        }
    }

    @Transactional
    public void createRoom(MultipartFile file, RoomCreateRequest createRequestDto) {
        Campsite campsite = getCampsiteById(createRequestDto.getCampsiteId());

        checkOwner(securityHelper.getLoginAccount(), campsite.getUser().getAccount());

        Room room = roomMapper.toRoom(createRequestDto);
        room.setCampsite(campsite);
        room.setInduty(indutyRepository.findByIndutyStr(createRequestDto.getInduty())
            .orElseThrow(() -> new NotFoundException(OwnerExceptionCode.INDUTY_NOT_FOUND)));
        roomRepository.saveAndFlush(room);

        if (file != null && !file.isEmpty()) {
            imageService.uploadRoomImage(room, file);
        }
    }

    @Transactional
    public void updateRoom(Long roomId, MultipartFile file, RoomUpdateRequest updateRequestDto) {
        Room room = getRoom(roomId);

        checkOwner(securityHelper.getLoginAccount(), room.getCampsite().getUser().getAccount());
        room.updateRoomInfo(updateRequestDto);
        room.setInduty(indutyRepository.findByIndutyStr(updateRequestDto.getInduty())
            .orElseThrow(() -> new NotFoundException(OwnerExceptionCode.INDUTY_NOT_FOUND)));

        if (file != null && !file.isEmpty()) {
            imageService.uploadRoomImage(room, file);
        } else {
            room.setImageUrl(null);
        }
    }

    @Transactional
    public void deleteRoom(Long roomId) {
        Room room = getRoom(roomId);

        checkOwner(securityHelper.getLoginAccount(), room.getCampsite().getUser().getAccount());
        roomRepository.delete(room);
    }

    private void checkOwner(String loginAccount, String ownedAccount) {
        if (!loginAccount.equals(ownedAccount)) {
            throw new UnauthorizedException(CampsiteExceptionCode.FORBIDDEN_CAMPSITE);
        }
    }

    private void checkExistedOwner(Campsite campsite) {
        if (campsite.getUser() != null) {
            throw new ConflictException(OwnerExceptionCode.OWNED_BIZRNO);
        }
    }

    private Room getRoom(Long roomId) {
        return roomRepository.findById(roomId)
            .orElseThrow(() -> new NotFoundException(RoomExceptionCode.NOT_FOUND_ROOM));
    }

    private Campsite getCampsiteById(Long campsiteId) {
        return campsiteRepository.findById(campsiteId)
            .orElseThrow(() -> new NotFoundException(CampsiteExceptionCode.CAMPSITE_NOT_FOUND));
    }

    private Campsite getCampsiteByBizrno(String bizrno) {
        return campsiteRepository.findByBizrno(bizrno)
            .orElseThrow(() -> new NotFoundException(OwnerExceptionCode.BIZRNO_NOT_FOUND));
    }

    private User getUser() {
        return userRepository.findByAccount(securityHelper.getLoginAccount())
            .orElseThrow(() -> new NotFoundException(UserExceptionCode.USER_NOT_FOUND));
    }

    /**
     * @return user instance.
     * @throws NotFoundException
     * @throws UnauthorizedException If user does not have {@link RoleName#OWNER} role.
     */
    private User getOwnerUser() {
        User user = getUser();
        if (!user.getRole().equals(RoleName.OWNER)) {
            throw new UnauthorizedException(AuthExceptionCode.UNAUTHORIZED_USER);
        }
        return user;
    }

}
