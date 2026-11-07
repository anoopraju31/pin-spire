import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { PolaroidCollage } from '@/components/shared/polaroid-collage';
import { RegisterForm } from '@/components/pages/auth/register-form';
import { SketchCoffeeStain } from '@/components/shared/sketch-coffee-stain';
import { SketchPushpin } from '@/components/shared/sketch-pushpin';
import {
  StarDoodle,
  OutlineStarDoodle,
  SwirlDoodle,
  SpringLoopDoodle,
  CurvedArrowDoodle,
} from '@/components/shared/sketch-doodles';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Join Pin-Spire to sketch, pin, and share your creative vision.',
};

export default async function RegisterPage() {
  const session = await getSession();
  if (session?.userId) {
    redirect('/posts');
  }

  return (
    <main className="bg-canvas relative flex min-h-screen w-full items-center justify-center overflow-x-hidden">
      {/* Decorative Doodles & Coffee Stains for Mobile/Tablet Background */}
      <div className="pointer-events-none absolute top-4 left-4 lg:hidden">
        <SketchPushpin size={32} rotation={-20} />
      </div>
      <div className="pointer-events-none absolute top-6 right-6 lg:hidden">
        <StarDoodle size={20} fill="#E89838" />
      </div>
      <div className="pointer-events-none absolute top-18 right-3 lg:hidden">
        <SpringLoopDoodle size={30} />
      </div>
      <div className="pointer-events-none absolute top-28 right-5 lg:hidden">
        <SwirlDoodle size={24} />
      </div>
      <div className="pointer-events-none absolute top-1/3 -left-8 lg:hidden">
        <SketchCoffeeStain size={110} />
      </div>
      <div className="pointer-events-none absolute bottom-24 left-3 lg:hidden">
        <CurvedArrowDoodle size={24} direction="right" />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-4 lg:hidden">
        <OutlineStarDoodle size={18} />
      </div>
      <div className="pointer-events-none absolute -right-6 -bottom-6 lg:hidden">
        <SketchCoffeeStain size={130} />
      </div>

      {/* Main Open Sketchbook Dual-Spread (Desktop) / Centered Column (Mobile/Tablet) */}
      <div className="relative flex min-h-screen w-full max-w-7xl flex-col items-center justify-center bg-red-500/0 px-6 py-6 sm:px-10 sm:py-10 lg:flex-row lg:px-12 lg:py-0">
        {/* Left Page: Polaroid Collage Spread (Desktop) */}
        <div className="hidden h-full w-1/2 flex-col items-center justify-center pr-8 lg:flex lg:pr-12">
          <PolaroidCollage mode="register" />
        </div>

        {/* Center Sketchbook Crease / Spine (Desktop) */}
        {/* <div className="hidden lg:block w-[1.5px] min-h-screen bg-ink/15 shadow-[0_0_6px_rgba(43,37,35,0.06)] self-center rounded-full" /> */}

        {/* Right Page: Authentication Form (Desktop, Tablet, Mobile) */}
        <div className="flex h-full w-full shrink-0 flex-col items-center justify-center bg-orange-500/0 py-6 pl-0 lg:w-1/2 lg:pl-12">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
