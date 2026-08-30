warning: in the working copy of 'app/mantenimiento/maintenance.module.css', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/app/mantenimiento/maintenance.module.css b/app/mantenimiento/maintenance.module.css[m
[1mindex cf31ac3..fd1f82f 100644[m
[1m--- a/app/mantenimiento/maintenance.module.css[m
[1m+++ b/app/mantenimiento/maintenance.module.css[m
[36m@@ -8,14 +8,17 @@[m
 [m
   position: relative;[m
   isolation: isolate;[m
[32m+[m[32m  display: grid;[m
[32m+[m[32m  width: 100%;[m
   min-height: 100svh;[m
[31m-  overflow: hidden;[m
[31m-  padding: clamp(1.5rem, 3.3vw, 3.75rem) clamp(1.25rem, 4.1vw, 4.75rem)[m
[31m-    clamp(1.25rem, 3vw, 2.5rem);[m
[32m+[m[32m  grid-template-rows: auto auto auto;[m
[32m+[m[32m  align-content: start;[m
[32m+[m[32m  overflow-x: clip;[m
[32m+[m[32m  padding: 1rem 1rem calc(6rem + env(safe-area-inset-bottom));[m
   color: var(--white);[m
   background:[m
[31m-    radial-gradient(circle at 72% 46%, rgb(255 174 85 / 36%), transparent 34%),[m
[31m-    linear-gradient(125deg, var(--orange-light) -24%, var(--orange) 45%, var(--orange-deep) 118%);[m
[32m+[m[32m    radial-gradient(circle at 72% 42%, rgb(255 174 85 / 34%), transparent 34%),[m
[32m+[m[32m    linear-gradient(135deg, var(--orange-light) -28%, var(--orange) 48%, var(--orange-deep) 120%);[m
   font-family: var(--font-open-sans), Arial, sans-serif;[m
 }[m
 [m
[36m@@ -31,84 +34,91 @@[m
 .ambientGlow {[m
   position: absolute;[m
   z-index: -1;[m
[31m-  inset: -35% auto auto -15%;[m
[31m-  width: 58vw;[m
[32m+[m[32m  top: -12rem;[m
[32m+[m[32m  left: -10rem;[m
[32m+[m[32m  width: min(34rem, 92vw);[m
   aspect-ratio: 1;[m
   border-radius: 50%;[m
[31m-  background: rgb(255 176 74 / 24%);[m
[31m-  filter: blur(90px);[m
[32m+[m[32m  background: rgb(255 184 92 / 22%);[m
[32m+[m[32m  filter: blur(72px);[m
[32m+[m[32m  pointer-events: none;[m
 }[m
 [m
 .header {[m
   position: relative;[m
   z-index: 5;[m
[31m-  display: flex;[m
[31m-  min-height: 8.2rem;[m
[31m-  align-items: flex-start;[m
[31m-  justify-content: space-between;[m
[32m+[m[32m  display: grid;[m
[32m+[m[32m  justify-items: center;[m
[32m+[m[32m  gap: 0.25rem;[m
[32m+[m[32m  width: 100%;[m
 }[m
 [m
 .logo {[m
[31m-  width: clamp(15rem, 21vw, 23rem);[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  width: min(78vw, 18rem);[m
   height: auto;[m
[31m-  margin-top: -2.8rem;[m
   object-fit: contain;[m
 }[m
 [m
 .history {[m
   margin: 0;[m
[31m-  font-size: clamp(0.92rem, 1.25vw, 1.28rem);[m
[31m-  font-weight: 600;[m
[31m-  line-height: 1.35;[m
[31m-  text-align: right;[m
[32m+[m[32m  font-size: clamp(0.9rem, 4vw, 1rem);[m
[32m+[m[32m  font-weight: 700;[m
[32m+[m[32m  line-height: 1.4;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  text-shadow: 0 1px 2px rgb(90 23 0 / 28%);[m
   text-wrap: balance;[m
 }[m
 [m
 .hero {[m
   position: relative;[m
[31m-  display: grid;[m
[31m-  min-height: calc(100svh - 15.5rem);[m
[31m-  grid-template-columns: minmax(28rem, 0.78fr) minmax(34rem, 1.22fr);[m
[32m+[m[32m  z-index: 1;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  flex-direction: column;[m
   align-items: center;[m
 }[m
 [m
 .copy {[m
   position: relative;[m
   z-index: 4;[m
[31m-  align-self: center;[m
[31m-  max-width: 39rem;[m
[31m-  padding: 1rem 0 2rem;[m
[31m-  animation: copy-in 700ms cubic-bezier(0.2, 0.72, 0.2, 1) both;[m
[32m+[m[32m  width: min(100%, 35rem);[m
[32m+[m[32m  padding-top: clamp(1.35rem, 5vw, 2rem);[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  animation: copy-in 600ms cubic-bezier(0.2, 0.72, 0.2, 1) both;[m
 }[m
 [m
 .status {[m
   display: inline-flex;[m
[32m+[m[32m  min-height: 2.75rem;[m
   align-items: center;[m
[31m-  gap: 0.65rem;[m
[31m-  margin: 0 0 1rem;[m
[31m-  padding: 0.72rem 1.3rem;[m
[32m+[m[32m  gap: 0.6rem;[m
[32m+[m[32m  margin: 0 0 0.9rem;[m
[32m+[m[32m  padding: 0.65rem 1rem;[m
   border-radius: 999px;[m
   background: var(--red);[m
[31m-  box-shadow: 0 0.45rem 1.5rem rgb(108 19 7 / 18%);[m
[31m-  font-size: clamp(0.92rem, 1vw, 1.08rem);[m
[32m+[m[32m  box-shadow: 0 0.45rem 1.4rem rgb(108 19 7 / 18%);[m
[32m+[m[32m  font-size: clamp(0.82rem, 3.6vw, 0.96rem);[m
   font-weight: 800;[m
[31m-  letter-spacing: 0.015em;[m
[32m+[m[32m  letter-spacing: 0.02em;[m
   text-transform: uppercase;[m
 }[m
 [m
 .status span {[m
[31m-  width: 0.56rem;[m
[31m-  height: 0.56rem;[m
[32m+[m[32m  width: 0.5rem;[m
[32m+[m[32m  height: 0.5rem;[m
[32m+[m[32m  flex: 0 0 auto;[m
   border-radius: 50%;[m
   background: var(--white);[m
[31m-  box-shadow: 0 0 0 0.25rem rgb(255 255 255 / 18%);[m
[32m+[m[32m  box-shadow: 0 0 0 0.22rem rgb(255 255 255 / 18%);[m
 }[m
 [m
 .title {[m
[32m+[m[32m  max-width: 100%;[m
   margin: 0;[m
   font-family: var(--font-bowlby-one), Impact, sans-serif;[m
   font-weight: 400;[m
[31m-  line-height: 0.88;[m
[32m+[m[32m  line-height: 0.9;[m
   letter-spacing: -0.035em;[m
   text-transform: uppercase;[m
   text-wrap: balance;[m
[36m@@ -116,47 +126,47 @@[m
 [m
 .title span {[m
   display: block;[m
[31m-  font-size: clamp(2.7rem, 4.25vw, 5rem);[m
[32m+[m[32m  font-size: clamp(1.85rem, 9.4vw, 2.8rem);[m
 }[m
 [m
 .title strong {[m
   display: block;[m
   font: inherit;[m
[31m-  font-size: clamp(6.2rem, 9vw, 10rem);[m
[31m-  line-height: 0.84;[m
[32m+[m[32m  font-size: clamp(4.75rem, 23.5vw, 7rem);[m
[32m+[m[32m  line-height: 0.82;[m
 }[m
 [m
 .intro {[m
   max-width: 31rem;[m
[31m-  margin: 1.3rem 0 1.35rem;[m
[31m-  font-size: clamp(1rem, 1.25vw, 1.3rem);[m
[31m-  line-height: 1.42;[m
[32m+[m[32m  margin: 1rem auto 0;[m
[32m+[m[32m  font-size: clamp(1rem, 4.25vw, 1.15rem);[m
[32m+[m[32m  font-weight: 600;[m
[32m+[m[32m  line-height: 1.52;[m
[32m+[m[32m  text-shadow: 0 1px 2px rgb(90 23 0 / 28%);[m
[32m+[m[32m  text-wrap: pretty;[m
 }[m
 [m
 .callActions {[m
[31m-  display: grid;[m
[31m-  justify-items: start;[m
[31m-  gap: 0.85rem;[m
[32m+[m[32m  display: none;[m
 }[m
 [m
 .primaryCta,[m
 .phoneNumber {[m
[31m-  display: inline-flex;[m
   align-items: center;[m
   text-decoration: none;[m
 }[m
 [m
 .primaryCta {[m
[31m-  min-height: 4.15rem;[m
[31m-  gap: 1rem;[m
[31m-  padding: 0.9rem 2rem;[m
[32m+[m[32m  min-height: 4rem;[m
[32m+[m[32m  gap: 0.9rem;[m
[32m+[m[32m  padding: 0.85rem 1.8rem;[m
   border: 2px solid var(--white);[m
   border-radius: 999px;[m
   color: var(--orange-deep) !important;[m
   background: var(--white);[m
   box-shadow: 0 0.8rem 2rem rgb(121 28 0 / 18%);[m
   font-family: var(--font-bowlby-one), Impact, sans-serif;[m
[31m-  font-size: clamp(1.15rem, 1.6vw, 1.65rem);[m
[32m+[m[32m  font-size: clamp(1.05rem, 1.5vw, 1.45rem);[m
   line-height: 1;[m
   letter-spacing: -0.02em;[m
   text-transform: uppercase;[m
[36m@@ -174,37 +184,36 @@[m
 [m
 .primaryCta svg,[m
 .phoneNumber svg {[m
[31m-  width: 1.7rem;[m
[32m+[m[32m  width: 1.6rem;[m
[32m+[m[32m  flex: 0 0 auto;[m
   fill: currentColor;[m
 }[m
 [m
 .phoneNumber {[m
[31m-  gap: 0.75rem;[m
[32m+[m[32m  gap: 0.7rem;[m
   font-family: var(--font-bowlby-one), Impact, sans-serif;[m
[31m-  font-size: clamp(1.6rem, 2.35vw, 2.65rem);[m
[32m+[m[32m  font-size: clamp(1.45rem, 2.3vw, 2.35rem);[m
   line-height: 1;[m
[31m-  letter-spacing: 0.01em;[m
 }[m
 [m
 .productStage {[m
[31m-  position: absolute;[m
[32m+[m[32m  position: relative;[m
   z-index: 2;[m
[31m-  top: 50%;[m
[31m-  right: clamp(-18rem, -10vw, -6rem);[m
[31m-  width: min(70vw, 76rem);[m
[31m-  aspect-ratio: 1.1;[m
[31m-  transform: translateY(-50%);[m
[31m-  animation: product-in 900ms 120ms cubic-bezier(0.2, 0.72, 0.2, 1) both;[m
[32m+[m[32m  width: min(100%, 34rem);[m
[32m+[m[32m  aspect-ratio: 1.08;[m
[32m+[m[32m  margin: 0.25rem auto 0;[m
[32m+[m[32m  overflow: hidden;[m
[32m+[m[32m  animation: product-in-mobile 700ms 100ms cubic-bezier(0.2, 0.72, 0.2, 1) both;[m
 }[m
 [m
 .chicken {[m
   position: absolute;[m
   z-index: 2;[m
[31m-  top: 50%;[m
[31m-  left: 52%;[m
[31m-  width: 88%;[m
[32m+[m[32m  top: 51%;[m
[32m+[m[32m  left: 51%;[m
[32m+[m[32m  width: 96%;[m
   height: auto;[m
[31m-  filter: saturate(1.08) contrast(1.02) drop-shadow(0 2rem 2rem rgb(109 25 0 / 26%));[m
[32m+[m[32m  filter: saturate(1.08) contrast(1.02) drop-shadow(0 1.35rem 1.45rem rgb(109 25 0 / 24%));[m
   transform: translate(-50%, -50%) rotate(3deg);[m
 }[m
 [m
[36m@@ -212,10 +221,10 @@[m
   position: absolute;[m
   z-index: 1;[m
   top: 50%;[m
[31m-  left: 48%;[m
[32m+[m[32m  left: 50%;[m
   width: 76%;[m
   aspect-ratio: 1;[m
[31m-  border: 1.5px solid rgb(255 255 255 / 72%);[m
[32m+[m[32m  border: 1.5px solid rgb(255 255 255 / 68%);[m
   border-radius: 50%;[m
   transform: translate(-50%, -50%);[m
 }[m
[36m@@ -226,51 +235,57 @@[m
   left: 14%;[m
   width: 0;[m
   height: 0;[m
[31m-  border-top: 0.52rem solid transparent;[m
[31m-  border-right: 1.25rem solid rgb(255 255 255 / 82%);[m
[31m-  border-bottom: 0.52rem solid transparent;[m
[32m+[m[32m  border-top: 0.45rem solid transparent;[m
[32m+[m[32m  border-right: 1.05rem solid rgb(255 255 255 / 78%);[m
[32m+[m[32m  border-bottom: 0.45rem solid transparent;[m
   content: "";[m
   transform: rotate(28deg);[m
 }[m
 [m
 .orbitTwo {[m
[31m-  width: 88%;[m
[31m-  border-color: rgb(255 255 255 / 42%);[m
[32m+[m[32m  width: 90%;[m
[32m+[m[32m  border-color: rgb(255 255 255 / 38%);[m
   animation: orbit-turn 24s linear infinite;[m
 }[m
 [m
 .orbitThree {[m
   width: 64%;[m
[31m-  border-color: rgb(255 255 255 / 48%);[m
[32m+[m[32m  border-color: rgb(255 255 255 / 44%);[m
   animation: orbit-turn-reverse 30s linear infinite;[m
 }[m
 [m
 .footer {[m
   position: relative;[m
   z-index: 6;[m
[31m-  display: flex;[m
[31m-  align-items: center;[m
[31m-  gap: 1.6rem;[m
[31m-  font-size: clamp(0.88rem, 1.05vw, 1.12rem);[m
[32m+[m[32m  display: grid;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  justify-items: center;[m
[32m+[m[32m  gap: 0.25rem;[m
[32m+[m[32m  padding-top: 0.25rem;[m
[32m+[m[32m  font-size: 0.95rem;[m
[32m+[m[32m  font-weight: 600;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  text-shadow: 0 1px 2px rgb(90 23 0 / 28%);[m
 }[m
 [m
 .footer a {[m
   display: inline-flex;[m
[32m+[m[32m  min-height: 2.75rem;[m
   align-items: center;[m
[32m+[m[32m  justify-content: center;[m
   gap: 0.55rem;[m
[31m-  margin: 0;[m
[32m+[m[32m  padding: 0.35rem 0.25rem;[m
   text-decoration: none;[m
 }[m
 [m
 .footer svg {[m
[31m-  width: 1.45rem;[m
[32m+[m[32m  width: 1.35rem;[m
[32m+[m[32m  flex: 0 0 auto;[m
   fill: currentColor;[m
 }[m
 [m
 .footerRule {[m
[31m-  width: 1px;[m
[31m-  height: 2.1rem;[m
[31m-  background: rgb(255 255 255 / 74%);[m
[32m+[m[32m  display: none;[m
 }[m
 [m
 .footer a:hover {[m
[36m@@ -279,7 +294,33 @@[m
 }[m
 [m
 .mobileCallBar {[m
[31m-  display: none;[m
[32m+[m[32m  position: fixed;[m
[32m+[m[32m  z-index: 20;[m
[32m+[m[32m  right: 0.75rem;[m
[32m+[m[32m  bottom: max(0.75rem, env(safe-area-inset-bottom));[m
[32m+[m[32m  left: 0.75rem;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  min-height: 3.75rem;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: center;[m
[32m+[m[32m  gap: 0.75rem;[m
[32m+[m[32m  padding: 0.8rem 1rem;[m
[32m+[m[32m  border: 2px solid var(--white);[m
[32m+[m[32m  border-radius: 999px;[m
[32m+[m[32m  color: var(--orange-deep) !important;[m
[32m+[m[32m  background: var(--white);[m
[32m+[m[32m  box-shadow: 0 0.85rem 2rem rgb(96 21 0 / 30%);[m
[32m+[m[32m  font-family: var(--font-bowlby-one), Impact, sans-serif;[m
[32m+[m[32m  font-size: clamp(1rem, 4.8vw, 1.25rem);[m
[32m+[m[32m  line-height: 1;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  text-transform: uppercase;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.mobileCallBar svg {[m
[32m+[m[32m  width: 1.5rem;[m
[32m+[m[32m  flex: 0 0 auto;[m
[32m+[m[32m  fill: currentColor;[m
 }[m
 [m
 .shell a:focus-visible {[m
[36m@@ -290,7 +331,7 @@[m
 @keyframes copy-in {[m
   from {[m
     opacity: 0;[m
[31m-    transform: translateY(1.25rem);[m
[32m+[m[32m    transform: translateY(1rem);[m
   }[m
   to {[m
     opacity: 1;[m
[36m@@ -298,14 +339,25 @@[m
   }[m
 }[m
 [m
[31m-@keyframes product-in {[m
[32m+[m[32m@keyframes product-in-mobile {[m
[32m+[m[32m  from {[m
[32m+[m[32m    opacity: 0;[m
[32m+[m[32m    transform: scale(0.96);[m
[32m+[m[32m  }[m
[32m+[m[32m  to {[m
[32m+[m[32m    opacity: 1;[m
[32m+[m[32m    transform: scale(1);[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@keyframes product-in-desktop {[m
   from {[m
     opacity: 0;[m
[31m-    transform: translateY(-47%) scale(0.95);[m
[32m+[m[32m    transform: translateX(3%) scale(0.96);[m
   }[m
   to {[m
     opacity: 1;[m
[31m-    transform: translateY(-50%) scale(1);[m
[32m+[m[32m    transform: translateX(3%) scale(1);[m
   }[m
 }[m
 [m
[36m@@ -321,170 +373,335 @@[m
   }[m
 }[m
 [m
[31m-@media (max-width: 900px) {[m
[32m+[m[32m@media (min-width: 640px) {[m
   .shell {[m
[31m-    min-height: 100svh;[m
[31m-    overflow: hidden auto;[m
[31m-    padding: 1.25rem 1.25rem 7rem;[m
[32m+[m[32m    padding: 1.5rem clamp(2rem, 6vw, 4rem) calc(6.25rem + env(safe-area-inset-bottom));[m
   }[m
 [m
   .header {[m
[31m-    display: grid;[m
[31m-    min-height: auto;[m
[31m-    justify-items: center;[m
[32m+[m[32m    grid-template-columns: minmax(0, 1fr) auto;[m
[32m+[m[32m    align-items: start;[m
[32m+[m[32m    justify-items: stretch;[m
[32m+[m[32m    gap: 2rem;[m
   }[m
 [m
   .logo {[m
[31m-    width: min(75vw, 20rem);[m
[31m-    margin: -2.2rem 0 -1rem;[m
[32m+[m[32m    width: min(18rem, 42vw);[m
   }[m
 [m
   .history {[m
[32m+[m[32m    margin-top: 0.25rem;[m
     font-size: 1rem;[m
[31m-    line-height: 1.35;[m
[31m-    text-align: center;[m
[32m+[m[32m    text-align: right;[m
   }[m
 [m
[31m-  .hero {[m
[32m+[m[32m  .copy {[m
[32m+[m[32m    width: min(100%, 42rem);[m
[32m+[m[32m    padding-top: 2rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .title span {[m
[32m+[m[32m    font-size: clamp(2.8rem, 7vw, 4rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .title strong {[m
[32m+[m[32m    font-size: clamp(7rem, 18vw, 9rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .intro {[m
[32m+[m[32m    font-size: 1.18rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .productStage {[m
[32m+[m[32m    width: min(78vw, 44rem);[m
[32m+[m[32m    margin-top: 0;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .footer {[m
[32m+[m[32m    display: flex;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    gap: 1.2rem;[m
[32m+[m[32m    padding-top: 0;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .footerRule {[m
     display: block;[m
[31m-    min-height: auto;[m
[32m+[m[32m    width: 1px;[m
[32m+[m[32m    height: 2rem;[m
[32m+[m[32m    align-self: center;[m
[32m+[m[32m    background: rgb(255 255 255 / 70%);[m
   }[m
 [m
[31m-  .copy {[m
[31m-    max-width: none;[m
[31m-    padding: 1.5rem 0 0;[m
[31m-    text-align: center;[m
[32m+[m[32m  .mobileCallBar {[m
[32m+[m[32m    right: max(1.25rem, calc((100vw - 42rem) / 2));[m
[32m+[m[32m    left: max(1.25rem, calc((100vw - 42rem) / 2));[m
   }[m
[32m+[m[32m}[m
 [m
[31m-  .status {[m
[31m-    margin-bottom: 1.2rem;[m
[31m-    padding: 0.65rem 1.15rem;[m
[32m+[m[32m@media (min-width: 960px) {[m
[32m+[m[32m  .shell {[m
[32m+[m[32m    height: 100vh;[m
[32m+[m[32m    height: 100dvh;[m
[32m+[m[32m    min-height: 0;[m
[32m+[m[32m    grid-template-rows: auto minmax(0, 1fr) auto;[m
[32m+[m[32m    align-content: stretch;[m
[32m+[m[32m    overflow: hidden;[m
[32m+[m[32m    padding: clamp(1.5rem, 3vw, 3rem) clamp(2rem, 4.5vw, 4.75rem)[m
[32m+[m[32m      clamp(1.25rem, 2.5vw, 2.5rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .header {[m
[32m+[m[32m    align-items: start;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .logo {[m
[32m+[m[32m    width: clamp(15rem, 20vw, 20rem);[m
   }[m
 [m
[31m-  .title {[m
[31m-    text-align: center;[m
[32m+[m[32m  .history {[m
[32m+[m[32m    font-size: clamp(0.95rem, 1.2vw, 1.2rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .hero {[m
[32m+[m[32m    display: grid;[m
[32m+[m[32m    height: 100%;[m
[32m+[m[32m    min-height: 0;[m
[32m+[m[32m    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);[m
[32m+[m[32m    align-items: center;[m
[32m+[m[32m    gap: clamp(1rem, 2vw, 2.5rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .copy {[m
[32m+[m[32m    width: 100%;[m
[32m+[m[32m    max-width: 38rem;[m
[32m+[m[32m    max-height: 100%;[m
[32m+[m[32m    padding: 1rem 0 1.5rem;[m
[32m+[m[32m    text-align: left;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .status {[m
[32m+[m[32m    margin-bottom: 1rem;[m
   }[m
 [m
   .title span {[m
[31m-    font-size: clamp(2.2rem, 10vw, 4rem);[m
[31m-    line-height: 0.98;[m
[32m+[m[32m    font-size: clamp(2.6rem, 4vw, 4.6rem);[m
   }[m
 [m
   .title strong {[m
[31m-    font-size: clamp(6rem, 26vw, 9rem);[m
[31m-    line-height: 0.82;[m
[32m+[m[32m    font-size: clamp(6rem, 8.5vw, 9.25rem);[m
   }[m
 [m
   .intro {[m
[31m-    max-width: 34rem;[m
[31m-    margin: 1.35rem auto 0;[m
[31m-    font-size: clamp(1rem, 4.4vw, 1.25rem);[m
[32m+[m[32m    margin: 1.2rem 0 1.25rem;[m
[32m+[m[32m    font-size: clamp(1rem, 1.3vw, 1.25rem);[m
   }[m
 [m
   .callActions {[m
[31m-    display: none;[m
[32m+[m[32m    display: grid;[m
[32m+[m[32m    justify-items: start;[m
[32m+[m[32m    gap: 0.75rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .primaryCta,[m
[32m+[m[32m  .phoneNumber {[m
[32m+[m[32m    display: inline-flex;[m
   }[m
 [m
   .productStage {[m
[31m-    position: relative;[m
[31m-    top: auto;[m
[31m-    right: auto;[m
[31m-    width: 112vw;[m
[31m-    max-width: 49rem;[m
[31m-    margin: -0.5rem -10vw -1rem;[m
[31m-    aspect-ratio: 1.03;[m
[31m-    transform: none;[m
[32m+[m[32m    width: auto;[m
[32m+[m[32m    height: min(100%, 50rem);[m
[32m+[m[32m    max-width: 100%;[m
[32m+[m[32m    max-height: 100%;[m
[32m+[m[32m    justify-self: end;[m
[32m+[m[32m    margin: 0;[m
[32m+[m[32m    overflow: visible;[m
[32m+[m[32m    animation-name: product-in-desktop;[m
   }[m
 [m
   .chicken {[m
     left: 53%;[m
[31m-    width: 97%;[m
[31m-    transform: translate(-50%, -50%) rotate(3deg);[m
[32m+[m[32m    width: 104%;[m
   }[m
 [m
   .orbit {[m
[31m-    left: 50%;[m
[31m-    width: 81%;[m
[32m+[m[32m    left: 51%;[m
[32m+[m[32m    width: 78%;[m
   }[m
 [m
   .orbitTwo {[m
[31m-    width: 94%;[m
[32m+[m[32m    width: 92%;[m
   }[m
 [m
   .orbitThree {[m
[31m-    width: 69%;[m
[32m+[m[32m    width: 66%;[m
   }[m
 [m
   .footer {[m
[31m-    justify-content: center;[m
[31m-    flex-wrap: wrap;[m
[31m-    row-gap: 0.65rem;[m
[31m-    font-size: 0.93rem;[m
[31m-    text-align: center;[m
[32m+[m[32m    justify-content: flex-start;[m
[32m+[m[32m    gap: 1.5rem;[m
[32m+[m[32m    font-size: clamp(0.9rem, 1vw, 1.08rem);[m
   }[m
 [m
   .mobileCallBar {[m
[31m-    position: fixed;[m
[31m-    z-index: 20;[m
[31m-    right: 1rem;[m
[31m-    bottom: max(1rem, env(safe-area-inset-bottom));[m
[31m-    left: 1rem;[m
[31m-    display: flex;[m
[31m-    min-height: 4rem;[m
[31m-    align-items: center;[m
[31m-    justify-content: center;[m
[31m-    gap: 0.8rem;[m
[31m-    padding: 0.9rem 1.25rem;[m
[31m-    border: 2px solid var(--white);[m
[31m-    border-radius: 999px;[m
[31m-    color: var(--orange-deep) !important;[m
[31m-    background: var(--white);[m
[31m-    box-shadow: 0 0.85rem 2rem rgb(96 21 0 / 30%);[m
[31m-    font-family: var(--font-bowlby-one), Impact, sans-serif;[m
[31m-    font-size: clamp(1.1rem, 5vw, 1.4rem);[m
[31m-    line-height: 1;[m
[31m-    text-decoration: none;[m
[31m-    text-transform: uppercase;[m
[32m+[m[32m    display: none;[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@media (min-width: 1200px) {[m
[32m+[m[32m  .hero {[m
[32m+[m[32m    grid-template-columns: minmax(29rem, 0.8fr) minmax(0, 1.2fr);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .copy {[m
[32m+[m[32m    max-width: 40rem;[m
   }[m
 [m
[31m-  .mobileCallBar svg {[m
[31m-    width: 1.55rem;[m
[31m-    fill: currentColor;[m
[32m+[m[32m  .productStage {[m
[32m+[m[32m    width: auto;[m
[32m+[m[32m    height: min(100%, 63rem);[m
[32m+[m[32m    max-width: min(56vw, 68rem);[m
[32m+[m[32m    transform: translateX(3%);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .chicken {[m
[32m+[m[32m    width: 106%;[m
   }[m
 }[m
 [m
[31m-@media (max-width: 380px) {[m
[32m+[m[32m@media (min-width: 480px) and (max-width: 959px) and (max-height: 600px) and (orientation: landscape) {[m
   .shell {[m
[31m-    padding-inline: 1rem;[m
[32m+[m[32m    padding: 0.75rem 1.25rem calc(5rem + env(safe-area-inset-bottom));[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .header {[m
[32m+[m[32m    grid-template-columns: minmax(0, 1fr) auto;[m
[32m+[m[32m    align-items: start;[m
[32m+[m[32m    justify-items: stretch;[m
   }[m
 [m
   .logo {[m
[31m-    width: 16rem;[m
[32m+[m[32m    width: min(12rem, 30vw);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .history {[m
[32m+[m[32m    margin-top: 0;[m
[32m+[m[32m    font-size: 0.82rem;[m
[32m+[m[32m    text-align: right;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .hero {[m
[32m+[m[32m    display: grid;[m
[32m+[m[32m    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);[m
[32m+[m[32m    align-items: center;[m
[32m+[m[32m    gap: 0.75rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .copy {[m
[32m+[m[32m    width: 100%;[m
[32m+[m[32m    padding-top: 0.5rem;[m
[32m+[m[32m    text-align: left;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .status {[m
[32m+[m[32m    min-height: 2.25rem;[m
[32m+[m[32m    margin-bottom: 0.55rem;[m
[32m+[m[32m    padding: 0.45rem 0.8rem;[m
[32m+[m[32m    font-size: 0.7rem;[m
   }[m
 [m
   .title span {[m
[31m-    font-size: 2rem;[m
[32m+[m[32m    font-size: clamp(1.5rem, 4vw, 2.1rem);[m
   }[m
 [m
   .title strong {[m
[31m-    font-size: 5.6rem;[m
[32m+[m[32m    font-size: clamp(3.75rem, 10vw, 5.5rem);[m
   }[m
 [m
   .intro {[m
[31m-    font-size: 0.98rem;[m
[32m+[m[32m    margin: 0.65rem 0 0;[m
[32m+[m[32m    font-size: 0.82rem;[m
[32m+[m[32m    line-height: 1.4;[m
   }[m
 [m
   .productStage {[m
[31m-    margin-top: -1.2rem;[m
[32m+[m[32m    width: min(48vw, 25rem);[m
[32m+[m[32m    margin: 0;[m
   }[m
 [m
   .footer {[m
[31m-    display: grid;[m
[31m-    justify-items: center;[m
[32m+[m[32m    justify-content: center;[m
[32m+[m[32m    font-size: 0.76rem;[m
   }[m
 [m
[31m-  .footerRule {[m
[31m-    display: none;[m
[32m+[m[32m  .footer a {[m
[32m+[m[32m    min-height: 2.25rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .mobileCallBar {[m
[32m+[m[32m    right: 1.25rem;[m
[32m+[m[32m    left: auto;[m
[32m+[m[32m    width: min(18rem, 42vw);[m
[32m+[m[32m    min-height: 3.25rem;[m
[32m+[m[32m    font-size: 0.92rem;[m
[32m+[m[32m  }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m@media (min-width: 960px) and (max-height: 720px) {[m
[32m+[m[32m  .shell {[m
[32m+[m[32m    padding-top: 1rem;[m
[32m+[m[32m    padding-bottom: 1rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .logo {[m
[32m+[m[32m    width: clamp(12rem, 17vw, 15rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .history {[m
[32m+[m[32m    font-size: 0.9rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .copy {[m
[32m+[m[32m    padding-block: 0.5rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .status {[m
[32m+[m[32m    min-height: 2.4rem;[m
[32m+[m[32m    margin-bottom: 0.65rem;[m
[32m+[m[32m    padding-block: 0.5rem;[m
[32m+[m[32m    font-size: 0.78rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .title span {[m
[32m+[m[32m    font-size: clamp(2rem, 3.4vw, 3.2rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .title strong {[m
[32m+[m[32m    font-size: clamp(4.7rem, 7vw, 6.8rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .intro {[m
[32m+[m[32m    margin-block: 0.8rem;[m
[32m+[m[32m    font-size: 0.95rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .primaryCta {[m
[32m+[m[32m    min-height: 3.35rem;[m
[32m+[m[32m    padding-block: 0.65rem;[m
[32m+[m[32m    font-size: 1rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .phoneNumber {[m
[32m+[m[32m    font-size: 1.45rem;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .productStage {[m
[32m+[m[32m    width: auto;[m
[32m+[m[32m    height: min(100%, 39rem);[m
[32m+[m[32m    max-width: min(48vw, 42rem);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  .footer {[m
[32m+[m[32m    font-size: 0.82rem;[m
   }[m
 }[m
 [m
[1mdiff --git a/app/mantenimiento/page.tsx b/app/mantenimiento/page.tsx[m
[1mindex 427635b..960ce2b 100644[m
[1m--- a/app/mantenimiento/page.tsx[m
[1m+++ b/app/mantenimiento/page.tsx[m
[36m@@ -50,8 +50,8 @@[m [mexport default function MaintenancePage() {[m
         <Image[m
           className={styles.logo}[m
           src="/images/maintenance/guantanamera-logo-white.png"[m
[31m-          width={1503}[m
[31m-          height={825}[m
[32m+[m[32m          width={1500}[m
[32m+[m[32m          height={800}[m
           priority[m
           alt="Guantanamera Bar Cafetería"[m
         />[m
