import { card } from "@/public/assets";
import styles, { layout } from "@/styles/style";
import Button from "./Button";
import Image from "next/image";
import { cn } from "@/lib/utils";
const CardDeal: React.FC = () => (
  <section className={cn(layout.section)}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better card deal <br className="sm:block hidden" /> in few easy
        steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.c Aliquet ultrices ac, ametau.
      </p>
      <Button styles="mt-10" />
    </div>
    <div className={layout.sectionImg}>
      <Image src="https://content.presspage.com/uploads/1523/1920_bvi-16x9-kv.jpg?10000" width={100}  height={100} alt="card" className="w-[100% h-100%" />
    </div>
  </section>
);

export default CardDeal;
