import { HttpResponse, http } from "msw";
import { getRoomsRes } from "@/mocks/api/data/reservation";

export const reservationHandlers = [
  http.get(`/campsite/:campsiteId/room`, ({ params, request }) => {
    const campsiteId = params.campsiteId; // 경로 파라미터로부터 campsiteId 추출

    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const size = url.searchParams.get("size");
    const headCnt = url.searchParams.get("headCnt");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    if (!campsiteId || !page || !size || !headCnt || !startDate || !endDate) {
      return new HttpResponse(null, { status: 404 });
    }

    const success = HttpResponse.json(getRoomsRes, { status: 200 });
    return success;
  }),
];
