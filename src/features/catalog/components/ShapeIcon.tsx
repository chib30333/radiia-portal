"use client";

import Image, { type StaticImageData } from "next/image";

import { useTheme } from "@/hooks/useTheme";
import roundShape from "@/assets/stone-shapes/Round.svg";
import ovalShape from "@/assets/stone-shapes/Oval.svg";
import princessShape from "@/assets/stone-shapes/Princess-square.svg";
import emeraldShape from "@/assets/stone-shapes/Emerald-octagon.svg";
import cushionShape from "@/assets/stone-shapes/Cushion.svg";
import radiantShape from "@/assets/stone-shapes/Radiant.svg";
import pearShape from "@/assets/stone-shapes/Pear.svg";
import marquiseShape from "@/assets/stone-shapes/Marquise.svg";

const shapeIconMap = {
  Round: roundShape,
  Oval: ovalShape,
  Princess: princessShape,
  Emerald: emeraldShape,
  Cushion: cushionShape,
  Radiant: radiantShape,
  Pear: pearShape,
  Marquise: marquiseShape
} as const;

type ShapeLabel = keyof typeof shapeIconMap;

type ShapeIconProps = {
  label: ShapeLabel;
  selected?: boolean;
  className?: string;
  size?: number;
};

export function ShapeIcon({ label, selected = false, className, size = 40 }: ShapeIconProps) {
  const { theme } = useTheme();
  const iconSrc = shapeIconMap[label] as StaticImageData;
  const filter =
    theme === "dark"
      ? selected
        ? "brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(5302%) hue-rotate(230deg) brightness(100%) contrast(101%)"
        : "brightness(0) saturate(100%) invert(70%) sepia(6%) saturate(346%) hue-rotate(184deg) brightness(23%) contrast(89%)"
      : selected
        ? "brightness(0) saturate(100%) invert(39%) sepia(93%) saturate(5302%) hue-rotate(230deg) brightness(100%) contrast(101%)"
        : "none";

  return (
    <Image
      src={iconSrc}
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      unoptimized
      style={{
        display: "block",
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "contain",
        filter
      }}
    />
  );
}
