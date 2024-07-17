"use client";
import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";

export function Background() {
  return (
    <ShaderGradientCanvas
      importedfiber={{ ...fiber, ...drei, ...reactSpring }}
      style={{
        position: "absolute",
        top: 0,
        zIndex: -100,
      }}
    >
      <ShaderGradient
        type="waterPlane"
        animate="on"
        uSpeed={0.1}

        color1="#ffee00"
        color2="#870015"
        color3="#502200"
        brightness={2.0}

        grain="off"
        // grainBlending={0.4}
        // uStrength={2.4}
        // uDensity={1.5}

        uFrequency={5.5}
        // uDensity={3}
        cDistance={2}
        cAzimuthAngle={0}
        cPolarAngle={90}
      />
    </ShaderGradientCanvas>
  );
}

// urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=0&cDistance=2&cPolarAngle=90&cameraZoom=1&color1=%23ffee00&color2=%23870015&color3=%23502200&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=3&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=1.6&uDensity=1.5&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false"