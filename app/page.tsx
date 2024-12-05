import RightGrid from '@/components/RightGrid'
import Spline from '@splinetool/react-spline/next'

export default function Home() {
   return (
      <section className="bg-transparent h-screen w-screen relative overflow-hidden">
         <div className="h-screen w-screen absolute flex flex-col justify-end items-center">
            <div className="h-2/3 w-full flex justify-between p-[2em]" dir="rtl">
               <RightGrid />
            </div>
         </div>
         <Spline
            scene="https://prod.spline.design/yPxQUarPtrWTse1Q/scene.splinecode"
            className="absolute z-[-1] bg-black"
         />
      </section>
   )
}
