"use client";
import Image from "next/image";
import Button from "components/Button";
import NavBar from "@/components/NavBar";

export default function Playground() {
  return (
    <div>
        <NavBar />
      <div className="flex justify-around items-center py-5">
        <h2>Buttons: </h2>
        <Button>Button</Button>
        <Button
          btnStyle="filled"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Button
        </Button>
        <Button
          btnStyle="outlined"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Button
        </Button>
      </div>
    </div>
  );
}
