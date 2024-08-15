// import React, { useRef, useEffect } from "react";
// import * as bodyPix from "@tensorflow-models/body-pix";
// import "@tensorflow/tfjs";
// import logo from "./navbar";

// const BodyColoring = () => {
//   const imageRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadAndPredict = async () => {
//       // Charger le modèle
//       const net = await bodyPix.load();

//       // Charger l'image
//       const image = imageRef.current;

//       // Attendre que l'image soit chargée
//       image.onload = async () => {
//         // Segmenter la personne dans l'image
//         const segmentation = await net.segmentPerson(image);

//         // Créer un masque coloré des parties du corps
//         const coloredPartImage = bodyPix.toColoredPartMask(segmentation);

//         const opacity = 0.7;
//         const flipHorizontal = false;
//         const maskBlurAmount = 0;

//         // Dessiner le masque coloré sur le canvas
//         bodyPix.drawMask(
//           canvasRef.current,
//           image,
//           coloredPartImage,
//           opacity,
//           maskBlurAmount,
//           flipHorizontal
//         );
//       };
//     };

//     loadAndPredict();
//   }, []);

//   return (
//     <div>
//       <h1>Coloration des parties du corps</h1>
//       <img
//         ref={imageRef}
//         src={logo}
//         alt="Human"
//         crossOrigin="anonymous"
//         style={{ display: "none" }}
//       />
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

// export default BodyColoring;

/**second part */

// import React, { useRef, useEffect } from "react";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import Webcam from "react-webcam";

// const HandControl = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       const net = await handpose.load(); // Charger le modèle Handpose

//       const detect = async () => {
//         if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//           const video = webcamRef.current.video;
//           const videoWidth = video.videoWidth;
//           const videoHeight = video.videoHeight;
//           console.log(videoWidth, videoHeight);

//           webcamRef.current.video.width = videoWidth;
//           webcamRef.current.video.height = videoHeight;

//           // Détection des mains
//           const hand = await net.estimateHands(video);
//           if (hand.length > 0) {
//             console.log(hand);
//             drawHand(hand, canvasRef.current, videoWidth, videoHeight);

//             // Exemple de contrôle : si la main est fermée, scroller vers le bas
//             const fistClosed = hand[0].handInViewConfidence > 0.3;
//             const fistredirect = hand[0].handInViewConfidence >= 0.5;
//             if (fistClosed) {
//               window.scrollBy(0, 10); // Scroller vers le bas
//             }
//             if (fistredirect) {
//               window.redirect("https://www.google.com");

//             }
//           }
//         }
//       };

//       setInterval(detect, 100);
//     };

//     loadHandposeModel();
//   }, []);

//   const drawHand = (predictions, canvas, videoWidth, videoHeight) => {
//     const ctx = canvas.getContext("d");
//     canvas.width = videoWidth;
//     canvas.height = videoHeight;

//     predictions.forEach((prediction) => {
//       const landmarks = prediction.landmarks;

//       // Dessiner les points
//       for (let i = 0; i < landmarks.length; i++) {
//         const x = landmarks[i][0];
//         const y = landmarks[i][1];

//         ctx.beginPath();
//         ctx.arc(x, y, 5, 0, 2 * Math.PI);
//         ctx.fillStyle = "green";
//         ctx.fill();
//       }
//     });
//   };

//   return (
//     <div>
//       <Webcam
//         ref={webcamRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 780,
//         }}
//       />
//     </div>
//   );
// };

// export default HandControl;

// import React, { useRef, useEffect } from "react";
// import * as handpose from "@tensorflow-models/handpose";
// import "@tensorflow/tfjs";
// import Webcam from "react-webcam";

// const HandControl = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       const net = await handpose.load(); // Charger le modèle Handpose

//       const detect = async () => {
//         if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//           const video = webcamRef.current.video;
//           const videoWidth = video.videoWidth;
//           const videoHeight = video.videoHeight;

//           webcamRef.current.video.width = videoWidth;
//           webcamRef.current.video.height = videoHeight;

//           // S'assurer que le canvas existe et obtenir le contexte
//           const canvas = canvasRef.current;
//           if (canvas) {
//             const ctx = canvas.getContext("2d");
//             if (ctx) {
//               // Colorier les régions
//               drawRegions(ctx, videoWidth, videoHeight);

//               // Détection des mains
//               const hand = await net.estimateHands(video);
//               drawHand(hand, ctx, videoWidth, videoHeight);
//               if (hand.length > 0) {
//                 detectRegion(hand[0], videoWidth, videoHeight);
//               }
//             } else {
//               console.error("Le contexte du canvas est null.");
//             }
//           }
//         }
//       };

//       setInterval(detect, 100);
//     };

//     loadHandposeModel();
//   }, []);

//   // Fonction pour diviser l'écran et détecter la région où la main est présente
//   const detectRegion = (hand, videoWidth, videoHeight) => {
//     const x = hand.landmarks[9][0]; // Coordonée x du centre de la main (paume)
//     const y = hand.landmarks[9][1]; // Coordonée y du centre de la main (paume)

//     const regionWidth = videoWidth / 4; // Largeur d'une région
//     const regionHeight = videoHeight / 2; // Hauteur d'une région

//     const column = Math.floor(x / regionWidth); // Colonne de la région
//     const row = Math.floor(y / regionHeight); // Ligne de la région

//     const regionIndex = row * 4 + column; // Calculer l'indice de la région (0 à 7)

//     switch (regionIndex) {
//       case 0:
//         console.log("Action pour la région 0 (haut gauche)");
//         break;
//       case 1:
//         console.log("Action pour la région 1 (haut milieu gauche)");
//         break;
//       case 2:
//         console.log("Action pour la région 2 (haut milieu droite)");
//         break;
//       case 3:
//         console.log("Action pour la région 3 (haut droite)");
//         break;
//       case 4:
//         console.log("Action pour la région 4 (bas gauche)");
//         break;
//       case 5:
//         console.log("Action pour la région 5 (bas milieu gauche)");
//         break;
//       case 6:
//         console.log("Action pour la région 6 (bas milieu droite)");
//         break;
//       case 7:
//         console.log("Action pour la région 7 (bas droite)");
//         break;
//       default:
//         console.log("Aucune région détectée");
//     }
//   };

//   // Fonction pour dessiner les régions colorées
//   const drawRegions = (ctx, videoWidth, videoHeight) => {
//     const regionWidth = videoWidth / 4;
//     const regionHeight = videoHeight / 2;

//     ctx.fillStyle = "red";
//   };

//   const drawHand = (predictions, ctx, videoWidth, videoHeight) => {
//     predictions.forEach((prediction) => {
//       const landmarks = prediction.landmarks;

//       // Dessiner les points de la main
//       for (let i = 0; i < landmarks.length; i++) {
//         const x = landmarks[i][0];
//         const y = landmarks[i][1];

//         ctx.beginPath();
//         ctx.arc(x, y, 5, 0, 2 * Math.PI);
//         ctx.fillStyle = "red";
//         ctx.fill();
//       }
//     });
//   };

//   return (
//     <div>
//       <Webcam
//         ref={webcamRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />
//     </div>
//   );
// };

// export default HandControl;

import React, { useRef, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";
import Webcam from "react-webcam";

const HandControl = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadHandposeModel = async () => {
      const net = await handpose.load(); // Charger le modèle Handpose

      const detect = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;

          // Détection des mains
          const hand = await net.estimateHands(video);

          // S'assurer que le canvas existe et obtenir le contexte
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              drawHand(hand, ctx, videoWidth, videoHeight);
              if (hand.length > 0) {
                detectRegion(hand[0], videoWidth, videoHeight);
              }
            } else {
              console.error("Le contexte du canvas est null.");
            }
          }
        }
      };

      setInterval(detect, 100);
    };

    loadHandposeModel();
  }, []);

  // Fonction pour diviser l'écran et détecter la région où la main est présente
  const detectRegion = (hand, videoWidth, videoHeight) => {
    const x = hand.landmarks[9][0]; // Coordonée x du centre de la main (paume)
    const y = hand.landmarks[9][1]; // Coordonée y du centre de la main (paume)

    const regionWidth = videoWidth / 4; // Largeur d'une région
    const regionHeight = videoHeight / 2; // Hauteur d'une région

    const column = Math.floor(x / regionWidth); // Colonne de la région
    const row = Math.floor(y / regionHeight); // Ligne de la région

    const regionIndex = row * 4 + column; // Calculer l'indice de la région (0 à 7)

    switch (regionIndex) {
      case 0:
        console.log("Action pour la région 0 (haut gauche)");
        // Ajoutez ici l'action pour la région 0
        break;
      case 1:
        console.log("Action pour la région 1 (haut milieu gauche)");
        // Ajoutez ici l'action pour la région 1
        break;
      case 2:
        console.log("Action pour la région 2 (haut milieu droite)");
        // Ajoutez ici l'action pour la région 2
        break;
      case 3:
        console.log("Action pour la région 3 (haut droite)");
        // Ajoutez ici l'action pour la région 3
        break;
      case 4:
        console.log("Action pour la région 4 (bas gauche)");
        // Ajoutez ici l'action pour la région 4
        break;
      case 5:
        console.log("Action pour la région 5 (bas milieu gauche)");
        // Ajoutez ici l'action pour la région 5
        break;
      case 6:
        console.log("Action pour la région 6 (bas milieu droite)");
        // Ajoutez ici l'action pour la région 6
        break;
      case 7:
        console.log("Action pour la région 7 (bas droite)");
        // Ajoutez ici l'action pour la région 7
        break;
      default:
        console.log("Aucune région détectée");
    }
  };

  const drawHand = (predictions, ctx, videoWidth, videoHeight) => {
    ctx.clearRect(0, 0, videoWidth, videoHeight); // Effacer le canvas avant de dessiner

    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

      // Dessiner les points
      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default HandControl;
