import Image from "next/image"

export function HeroPhotoGrid() {
  return (
    <div className="relative mx-auto flex w-full max-w-xl items-center justify-center py-4 lg:py-0">
      {/* Background Organic Decorative Backdrop Shapes */}
      <div 
        className="absolute -top-6 -left-6 h-60 w-60 rounded-[40%_60%_70%_30%/50%_60%_40%_50%] bg-[#e2e8df] dark:bg-slate-800/40 opacity-70 transition-transform duration-700 hover:scale-105" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-8 -right-4 h-72 w-72 rounded-[60%_40%_50%_50%/50%_50%_60%_40%] bg-[#eae3d9] dark:bg-zinc-800/40 opacity-80 transition-transform duration-700 hover:scale-105" 
        aria-hidden="true" 
      />

      {/* Main Overlapping Tilted Image Cards Container - Bolder & Larger Scale */}
      <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[520px]">
        {/* Card 1: Top-Right Tilted Image */}
        <figure 
          className="absolute right-0 top-0 aspect-[4/3] w-[76%] rotate-[4deg] overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02] hover:z-20 sm:right-2"
        >
          <Image
            src="/outreach/workshop-spider-robot.jpg"
            alt="Students building a spider robot with mentorship"
            fill
            sizes="(max-width: 768px) 75vw, 420px"
            className="object-cover"
            priority
          />
        </figure>

        {/* Card 2: Bottom-Left Overlapping Front Tilted Image */}
        <figure 
          className="absolute bottom-0 left-0 z-10 aspect-[4/3] w-[78%] -rotate-[3deg] overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02] sm:left-2"
        >
          <Image
            src="/outreach/workshop-girls-solar.jpg"
            alt="Students collaborating on a solar tracking robot build"
            fill
            sizes="(max-width: 768px) 80vw, 450px"
            className="object-cover"
            priority
          />
        </figure>
      </div>
    </div>
  )
}
