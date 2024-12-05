'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Timeline } from '@/components/ui/timeline'

gsap.registerPlugin(ScrollTrigger)
const data = [
   {
      title: 'الشهر الاول',
      content: (
         <div className=" w-full">
            <div className="h-96 flex justify-between flex-col">
               <ul className="list-disc font-cairo space-y-1r ">
                  <li>
                     <h4>Core React Concepts</h4>
                  </li>
                  <li>
                     <h4>Learn Core Hooks</h4>
                  </li>
                  <li>
                     <h4>Intermediate React Concepts</h4>
                  </li>
               </ul>
            </div>
         </div>
      ),
   },
   {
      title: 'الشهر الثاني',
      content: (
         <div className=" w-full">
            <div className="h-96">
               <ul className="list-disc font-cairo space-y-1r">
                  <li>
                     <h4>Create React Apps with Vite</h4>
                  </li>
                  <li>
                     <h4>Fetch Data with TanStack Query</h4>
                  </li>
                  <li>
                     <h4>Manage State with Zustand</h4>
                  </li>
                  <li>
                     <h4>Style with TailwindCSS and Radix</h4>
                  </li>
               </ul>
            </div>
         </div>
      ),
   },
   {
      title: 'الشهر الثالث',
      content: (
         <div className=" w-full">
            <div className="h-96">
               <ul className="list-disc font-cairo space-y-1r">
                  <li>
                     <h4>Add Routing with TanStack Router</h4>
                  </li>
                  <li>
                     <h4>Build Forms with React Hook Form</h4>
                  </li>
                  <li>
                     <h4>Full-Stack React Apps with Next.js</h4>
                  </li>
               </ul>
            </div>
         </div>
      ),
   },
]

const ThreeJSViewer = () => {
   const canvasRef = useRef<HTMLCanvasElement | null>(null)
   const [loading, setLoading] = useState(true)
   let brainModel: THREE.Object3D | null = null

   const setupViewer = useCallback(() => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 1, 5)

      const renderer = new THREE.WebGLRenderer({
         canvas: canvasRef.current!,
         alpha: true,
         antialias: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)

      // Add light
      const pointLight = new THREE.PointLight(0xffffff, 50)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      const loader = new GLTFLoader()

      // Load the GLB model (brain model)
      loader.load(
         'brain1.glb',
         (gltf) => {
            brainModel = gltf.scene
            brainModel.scale.set(1.8, 1.8, 1.8)
            scene.add(brainModel)
            setLoading(false)
         },
         undefined,
         (error) => console.error(error),
      )

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.target.set(0, 1, 0)

      // Resize event listener
      window.addEventListener('resize', () => {
         renderer.setSize(window.innerWidth, window.innerHeight)
         camera.aspect = window.innerWidth / window.innerHeight
         const size = window.innerWidth / window.innerHeight
         brainModel?.scale.set(size, size, size)
         camera.updateProjectionMatrix()
      })

      // Animation on scroll
      ScrollTrigger.create({
         trigger: '#second-section',
         start: 'top bottom',
         end: 'bottom top',
         scrub: 2,
         onUpdate: (self) => {
            const progress = self.progress

            if (brainModel) {
               // Adjust rotation and position range to prevent overlap with text
               gsap.to(brainModel.rotation, {
                  y: progress * Math.PI * 1.5,
                  duration: 1,
                  ease: 'power3.out',
               })
               gsap.to(brainModel.position, {
                  x: Math.max(-4, -progress * 20), // Limit x-axis movement
                  duration: 0.5,
                  ease: 'power2.out',
               })
               gsap.to(brainModel.scale, {
                  x: Math.max(1.5, 2 - progress),
                  y: Math.max(1.5, 2 - progress),
                  z: Math.max(1.5, 2 - progress),
                  duration: 1,
                  ease: 'power2.out',
               })
            }
         },
      })

      // Animation loop
      const animate = () => {
         requestAnimationFrame(animate)
         controls.update()
         renderer.render(scene, camera)
      }

      animate()
   }, [])

   useEffect(() => {
      setupViewer()

      // Stagger animation for the text content
      gsap.fromTo(
         '.stagger-animate h1',
         { opacity: 0, y: 50 }, // Starting state
         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, // End state
      )

      // Animate the list items with stagger effect
      gsap.fromTo(
         '.stagger-animate ul li',
         { opacity: 0, x: -50 }, // Starting state for list items
         {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.2, // Stagger animation by 0.2 seconds
         },
      )

      // Animate the paragraph
      gsap.fromTo(
         '.stagger-animate p',
         { opacity: 0, y: 30 }, // Starting state for paragraph
         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, // End state
      )
      gsap.fromTo(
         '.text-section',
         { opacity: 0, y: 30 }, // Starting state for paragraph
         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, // End state
      )

      gsap.to('.stagger-animate p', {
         scrollTrigger: {
            trigger: '#second-section',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
               const progress = self.progress
               gsap.to('.stagger-animate ', {
                  y: -progress * 100,
                  opacity: 1 - progress * 2,
                  duration: 0.5,
               })
            },
         },
      })

      gsap.to('.text-section', {
         scrollTrigger: {
            trigger: '#second-section',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            onUpdate: (self) => {
               const progress = self.progress
               gsap.to('.text-section ', {
                  y: -progress * 100,
                  opacity: 1 - progress * 2,
                  duration: 0.5,
               })
            },
         },
      })
   }, [setupViewer])

   return (
      <>
         {loading && (
            <div className="w-screen h-screen flex justify-center items-center bg-black fixed z-[9999]">
               <div className="text-white text-2xl">Loading...</div>
            </div>
         )}
         <div className="w-screen h-screen bg-black grid grid-cols-12 p-4 px-6 grid-rows-[auto_minmax(0,1fr)] relative">
            <div
               className="font-arabic h-full w-full bg-transparent text-white absolute px-[3em] py-[10em] space-y-1r flex flex-col justify-center gap-10 stagger-animate"
               dir="rtl"
            >
               <div className="space-y-0.5r">
                  <h1 className="">نظرة عن قرب.</h1>
                  <span className="text-gray-400 text-sm">ماذا ينتظرك؟</span>
                  <ul className="space-y-1 list-disc pr-[18px] text-lg">
                     <li>
                        <strong className="text-header-gold text-xl">100</strong> ساعة مكثفة
                     </li>
                     <li>مدربين محترفين</li>
                     <li>مشاريع عملية و احترافية</li>
                     <li>شهادات انهاء الدورة</li>
                  </ul>
               </div>
               <div className="w-fit max-w-[420px] space-y-1r">
                  <h1 className="text-header-gold text-4xl "> ليش كود كامبس ؟</h1>
                  <p>
                     في كود كامبس، نؤمن أن التعلم يجب أن يكون تجربة فريدة، مصممة خصيصاً لك. عبر دمج التكنولوجيا المتقدمة
                     مع خبرتنا العميقة في مجال البرمجة، نضمن لك الحصول على مهارات لا تقدر بثمن في{' '}
                     <strong className="font-bold ">React JS</strong>، وفتح أبواب جديدة لعالم البرمجة الحديث.
                  </p>
               </div>
            </div>
            <div className="text-white flex items-center max-xl:items-start max-xl:top-20 justify-center absolute bottom-0 -top-80 left-0 right-0 ">
               <div className="absolute text-center text-[clamp(24px,20vw,150px)] max-xl:text-[clamp(24px,20vw,20px)]  font-800 leading-[1] tracking-[10px] z-[1] text-section">
                  React
                  <br />
                  JS Course
               </div>
               <div
                  className="z-[0] absolute text-center text-[clamp(24px,20vw,150px)]  max-xl:text-[clamp(24px,20vw,20px)] font-800 leading-[1] tracking-[10px] text-section"
                  style={{
                     filter: 'blur(7.5px)',
                  }}
               >
                  React
                  <br />
                  JS Course
               </div>
               <div
                  id="stroke-section"
                  className="z-[3] absolute text-center text-[clamp(24px,20vw,150px)]  max-xl:text-[clamp(24px,20vw,20px)] font-800 leading-[1] tracking-[10px] stroke-slate-950 text-section"
                  style={{
                     WebkitTextStroke: '1px white', // Text stroke with white color
                     color: 'transparent', // Text is transparent to show the stroke
                  }}
               >
                  React
                  <br />
                  JS Course
               </div>
            </div>
            <div className="w-full h-full"></div>
         </div>

         <div
            id="webgi-canvas-container"
            className="w-screen h-screen flex justify-end flex-col items-center fixed top-0 pointer-events-none min-h-[831px] z-[2] max-xl:hidden"
         >
            <canvas
               id="three-canvas"
               ref={canvasRef}
               className="w-full h-full bg-transparent"
               style={{
                  willChange: 'transform',
               }}
            ></canvas>
         </div>

         <div className="w-full h-[200vh] text-white bg-black  font-arabic" id="second-section">
            <div className="w-full" dir="rtl">
               <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                  <h1 className="text-lg md:text-5xl mb-4 text-header-gold  max-w-5xl ">خريطة الطريق</h1>
                  <p className="text-neutral-500  text-sm md:text-base max-w-sm">مدة الدورة 3 اشهر</p>
               </div>

               <Timeline data={data} />
            </div>
         </div>
         <div className="w-screen h-[100vh]  bg-black" id="thierd-section"></div>
      </>
   )
}

export default ThreeJSViewer
