import { IEmptyNotificationList } from '@/types/myFreeAlert';
import photo1 from "@/assets/images/dummy/camping_spot_2.png";

// 더미데이터 1개
export function GetMyAlerts(): IEmptyNotificationList {
  return {
    result: "ok",
    data: {
      emptyNotificationList: [
        {
          emptyNotificationId: 1,
          startDate: "2024-05-11",
          endDate: "2024-05-12",
          room: {
            roomName: "A구역 (벚꽃 캠핑존)",
            campsite: {
              campsiteId: 1,
              campsiteName: "캠프유캠푸 캠핑장",
              address: "강원도 춘천시 남면 가옹개길 52-9",
              thumbnailImageUrl: `${photo1}`
            }
          }
        }
        // 추가 데이터...
      ]
    }
  };
}