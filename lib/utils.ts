  import { ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";


  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  // export function brainScrollAnimation(position: Vector3, target: Vector3, update: () => void) {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '#second-section',
  //       start: 'top bottom',
  //       end: 'top top',
  //       scrub:1,
  //       immediateRender: false,
  //       onUpdate: update,
  //     },
  //   });
  
  //   // Animate the camera position with a smooth transition
  //   tl.to(position, {
  //     x: -0.1708420169,   // Adjust these values based on how far you want the camera to move
  //     y: 18.4461884016,
  //     z: -1.0234953228,
    
  //     ease: 'power2.inOut', // Smooth easing
  //   });
  
  //   // Animate the camera target with a smooth rotation
  //   tl.to(target, {
  //     x: -0.1708418285,
  //     y: 0.1057434259,
  //     z: -1.0235136651,
     
  //     ease: 'power2.inOut',
  //     // Ensure camera gets updated with each frame
  //   }, 0);  // The 0 ensures both animations happen in parallel
  // }