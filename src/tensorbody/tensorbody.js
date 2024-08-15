import React, { useEffect, useRef } from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

const BodyDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runBodyDetection = async () => {
      // Charger le modèle BodyPix
      const net = await bodyPix.load();

      // Configurer la vidéo
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadeddata = async () => {
        const detect = async () => {
          // Effectuer la segmentation corporelle
          const segmentation = await net.segmentPersonParts(videoRef.current, {
            flipHorizontal: false,
            internalResolution: "medium",
            segmentationThreshold: 0.7,
          });

          // Dessiner les résultats sur le canvas
          const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
          const opacity = 0.7;
          const flipHorizontal = false;
          const maskBlurAmount = 0;
          const canvas = canvasRef.current;

          bodyPix.drawMask(
            canvas,
            videoRef.current,
            coloredPartImage,
            opacity,
            maskBlurAmount,
            flipHorizontal
          );

          requestAnimationFrame(detect);
        };

        detect();
      };
    };

    runBodyDetection();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default BodyDetection;
