'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const [count, setCount] = useState(0);
  const [startTimer, setStartTimer] = useState(3);
  const [isStarting, setStarting] = useState(false);
  const [isStarted, setStarted] = useState(false);
  const [isFinished, setFinished] = useState(false);
  
  useEffect(() => {
    if (isStarting) {
      const timer = setInterval(() => {
        // 3秒カウントダウン
        setStartTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStarting(false);
            setStarted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        setStartTimer(3);
        clearInterval(timer);
      };
    }
    
    // 10秒経ったら終了
    if (isStarted) {
      setCount(0);
      const timer = setTimeout(() => {
        setStarted(false);
        setFinished(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isStarting, isStarted, isFinished]);
  
  const getBackgroundColor = () => {
    return "bg-white";
    // if (isStarted) {
    //   const intensity = Math.round(count / 10); // 0から9の範囲に
      
    //   switch(intensity) {
    //     case 0:
    //       return "bg-white";
    //     case 1:
    //       return "bg-red-50";
    //     case 2:
    //       return "bg-red-100";
    //     case 3:
    //       return "bg-red-200";
    //     case 4:
    //       return "bg-red-300";
    //     case 5:
    //       return "bg-red-400";
    //     case 6:
    //       return "bg-red-500";
    //     case 7:
    //       return "bg-red-600";
    //     case 8:
    //       return "bg-red-700";
    //     case 9:
    //       return "bg-red-800";
    //     default:
    //       return "bg-red-900";
    //   }
    // }
  }
  
  const currentBackgroundColor = getBackgroundColor();
  
  return (
    <div className={`flex flex-col w-full h-screen ${currentBackgroundColor}`}>
      <header className="fixed overflow-hidden bg-black w-full h-10 left-0 top-0 flex px-10 gap-20 items-center">
        <h1 className="text-xl font-bold text-white">TAPの鬼</h1>
      </header>
      <main className="flex w-full h-full p-[32px] pt-20 justify-center flex-col gap-[32px] items-center">
        
        {!isStarted && !isStarting && !isFinished ? (
          <Button className="w-[200px] h-[50px] px-30 py-10 bg-white text-black font-bold text-xl bg-black text-white"
            variant="outline" onClick={() => setStarting(true)}>
            START
          </Button>
        ) : ( <></> )}
        {isStarting ? (
          <h1 className="text-4xl font-bold text-black">
            {startTimer}
          </h1>
        ) : ( <></> )}
        {isStarted ? (
          <Button className="w-[200px] h-[50px] px-30 py-10 bg-white text-black font-bold text-xl bg-black text-white"
            variant="outline" onClick={() => setCount(count + 1)}>
            押せ!!
          </Button>
        ) : ( <></> )}
        {isFinished ? (
          <Card className="w-100">
            <CardContent className="flex flex-col gap-2">
              <h1 className="text-lg font-bold text-black text-center">
                あなたのスコアは
              </h1>
              <h1 className="text-4xl font-bold text-black text-center">
                {count}
              </h1>
              <h1 className="text-lg font-bold text-black text-center">
                でした!!
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="bg-black text-white font-bold text-xl px-10 py-5"
                variant="outline" onClick={() => setFinished(false)}>
                終了
              </Button>
            </CardFooter>
          </Card>
        ) : ( <></> )}
      </main>
    </div>
  );
}
