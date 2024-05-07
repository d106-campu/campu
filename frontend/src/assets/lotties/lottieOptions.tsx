import no_image from "@/assets/lotties/no_image.json";
import no_result from "@/assets/lotties/no_result.json"

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
