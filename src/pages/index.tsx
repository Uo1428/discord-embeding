import type { NextPage } from "next";
import Head from "next/head";
import { Button, Input, Textarea } from "@nextui-org/react";
import Center from "../components/Center";
import React from "react";
import { URL, FakeURL } from "../lib/constants";
import Modal from "../components/Modal";

interface modalContent {
  text: string;
  button: string;
  url?: string;
}

const Home: NextPage = () => {
  const [isValidColor, setIsValidColor] = React.useState(true);
  const [isValidUrl, setIsValidUrl] = React.useState(true);
  // Create 4 references to the input elements
  const input1 = React.useRef<HTMLInputElement>(null); // title
  const input2 = React.useRef<HTMLTextAreaElement>(null); // desc
  const input3 = React.useRef<HTMLInputElement>(null); // image
  const input4 = React.useRef<HTMLInputElement>(null); // theme

  const [modalContent, setModalContent] = React.useState({} as modalContent);
  const [modalVisible, setModalVisible] = React.useState(false);

  const onPress = () => {
    // Check if at least title, desc, or image is provided; embed will work as long as one of these are provided
      if ((input1.current && input1.current.value) || 
      (input2.current && input2.current.value) || 
      (input3.current && input3.current.value)) {
      // Get the values of the input elements
      const titleValue = input1.current?.value ?? "";
      const descValue = input2.current?.value ?? "";
      const imageValue = input3.current?.value ?? "";
      const themeValue = input4.current?.value ?? "";
      //  Create data obj
      const data = {
        title: titleValue,
        description: descValue,
        imageUrl: imageValue,
        color: themeValue,
      };

      // Values should never not be a string, but check anyway
      for (const key in data) {
        if (typeof data[key as keyof typeof data] !== "string") {
          setModalContent({
            text: "Invalid data has been provided! Please try again or reload the page.",
            button: "Close"
          });
          return setModalVisible(true);
        }
      }

      // Encode to base64
      let objJsonStr = JSON.stringify(data);
      let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

      // Set /embed query then show success dialog
      setModalContent({
        text: "Successfully created embed!",
        button: "Copy Link",
        url: `${FakeURL}${URL}/embed?data=${objJsonB64}`
      });
      setModalVisible(true);
    } else {
        setModalContent({
          text: "You must provide either a title, description, or image URL.",
          button: "Close"
        });
        return setModalVisible(true);
    }
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Discord User Embed Generator" />
        <meta property="og:description" content="A small site to create Discord embeds that you can send as a user." />
        <meta name="twitter:title" content="Discord User Embed Generator" />
        <meta name="twitter:description" content="A small site to create Discord embeds that you can send as a user." />
        <meta name="theme-color" content="#abe0ff" />

        <meta property="og:image" content="/images/meta.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/meta.png" />

        <title>Discord User Embed Generator</title>
        <meta name="description" content="A small site to create Discord embeds that you can send as a user." />
      </Head>
      <Modal
        modalContent={modalContent}
        visible={modalVisible}
        closeHandler={() => {
          setModalVisible(false);
        }}
      />
      <Center classes={"mt-[12%]"}>
        <Input type="text" size="xl" ref={input1} placeholder="Title" />
      </Center>
      <Center classes={"mt-5 w-200"}>
        <Textarea size="xl" ref={input2} cols={23} rows={6} placeholder="Description" />
      </Center>
      <Center classes={"mt-5"}>
        <Input
          type="url"
          size="xl"
          ref={input3}
          placeholder="Image URL"
          status={isValidUrl ? "default" : "error"}
          onChange={(e) => {
            const value = e.target.value;
            setIsValidUrl(value.length === 0 || value.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i) !== null);
          }}
        />
      </Center>
      <Center classes={"mt-5"}>
        <Input
          type="text"
          size="xl"
          ref={input4}
          placeholder="Hex Color"
          status={isValidColor ? "default" : "error"}
          onChange={(e) => {
            const value = e.target.value;
            setIsValidColor(value.length === 0 || value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) !== null);
          }}
        />
      </Center>
      <Center classes={"mt-5"}>
        <Button color="primary" onPress={onPress}>
          Create
        </Button>
      </Center>
    </>
  );
};

export default Home;
