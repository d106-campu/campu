import no_image from "@/assets/lotties/no_image.json";
import no_result from "@/assets/lotties/no_result.json";
import dot_loading from "@/assets/lotties/dot_loading.json";
import loading from "@/assets/lotties/loading.json";
import tent from "@/assets/lotties/tent.json";
import caravan from "@/assets/lotties/caravan.json";
import warning from "@/assets/lotties/warning.json";
import error from "@/assets/lotties/error.json";

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
  animationData: dot_loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
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

export const caravanOptions = {
  loop: true,
  autoplay: true,
  animationData: caravan,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const warningOptions = {
  loop: true,
  autoplay: true,
  animationData: warning,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const errorOptions = {
  loop: true,
  autoplay: true,
  animationData: error,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
