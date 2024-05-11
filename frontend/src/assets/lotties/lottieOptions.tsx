import no_image from "@/assets/lotties/no_image.json";
import no_result from "@/assets/lotties/no_result.json";
import rooms_loading from "@/assets/lotties/rooms_loading.json";
import tent from "@/assets/lotties/tent.json";

export const noImageOptions = {
  loop: true,
  autoplay: true,
  animationData: no_image,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const noResultOptions = {
  loop: true,
  autoplay: true,
  animationData: no_result,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const roomsLoadingOptions = {
  loop: true,
  autoplay: true,
  animationData: rooms_loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const tentOptions = {
  loop: true,
  autoplay: true,
  animationData: tent,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
