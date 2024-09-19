// src/components/Hero.tsx

import styles from "@/styles/style";
import { discount } from "@/public/assets";
import GetStarted from "./GetStarted";
import Image from "next/image";

const Hero: React.FC = () => (
  <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} py-6`}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
      <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
        <Image src={discount} alt="discount" className="w-[32px] h-[32px]" />
        <p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">20%</span> Discount For{" "}
          <span className="text-white">Partners</span>
        </p>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
          Your Trusted <br className="sm:block hidden" />{" "}
          <span className="text-gradient">Partner in Car</span>{" "}
        </h1>
        <div className="ss:flex hidden md:mr-4 mr-0">
          <GetStarted />
        </div>
      </div>
      <h1 className="w-full font-poppins font-semibold ss:text-[38px] text-[22px] text-white ss:leading-[80px] leading-[75px]">
        Electrical and Mechanical Services.
      </h1>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Expert Services for All Makes and Models – Quality You Can Rely On. From
        routine maintenance to complex repairs, we’ve got you covered with expert
        electrical and mechanical solutions for all types of vehicles.
      </p>
    </div>
    <div className={`${styles.flexCenter} flex-1 flex md:my-0 my-10 relative`}>
      <div className="relative w-[90%] h-[100%]  overflow-hidden">
        <Image
          src={`https://media.cdn-jaguarlandrover.com/api/v2/images/76950/w/1600.jpg`}
          alt="car animation"
          layout="fill"
          objectFit="cover"
          className="relative z-[5] rounded-[20px]  brightness-110 contrast-125"
          style={{ borderRadius: '20px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-black/60 z-[6] rounded-[20px]" />
      </div>
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
    <div className={`${styles.flexCenter} ss:hidden`}>
      <GetStarted />
    </div>
  </section>
);

export default Hero;
