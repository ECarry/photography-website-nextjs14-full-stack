import { db } from "@/lib/db";

import ShuffleGrid from "@/app/(dashboard)/_components/ShuffleGrid";
import ShimmerButton from "@/app/(dashboard)/_components/ShimmerButton";

const ShuffleHero = async () => {
  const squareData = await db.photo.findMany({
    take: 16,
    where: {
      category: {
        title: 'ecarry'
      }
    }
  })

  if (squareData.length < 1) {
    return null
  }

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-2xl md:text-4xl font-semibold">
          他说这世界是不是我们的
        </h3>
        <h3 className="text-2xl md:text-4xl font-semibold">
          我应该穿什么吃什么
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          如果没有人看着，我那该多快乐！
        </p>
        <ShimmerButton />
      </div>
      <ShuffleGrid squareData={squareData} />
    </section>
  );
};

export default ShuffleHero;
