import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import swal from "sweetalert";
import GetUser from "../apis/Users/GetUser";
import PreLoader from "../components/preLoader";

const Home: NextPage = () => {
  const [userId, setUserId] = useState<string>("");
  const [preLoader, setPreLoader] = useState<boolean>(false);
  const OnSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId) {
      setPreLoader(true);
      const result = await GetUser(userId);
      if (result && result.status === 200) {
        setPreLoader(false);
        window.location.replace(`/profile/${userId}`);
      } else {
        setPreLoader(false);
        swal({
          title: "این کاربر با این ایدی وجود ندارد",
          icon: "error",
        });
      }
    }
  };
  return (
    <>
      {preLoader ? <PreLoader isLoading={preLoader} /> : ""}
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        background="blackAlpha.900"
      >
        <Flex direction="column" background="gray.700" p={12} rounded={6}>
          <form
            onSubmit={OnSubmitForm}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Heading mb={6}>Github Profile</Heading>
            <Input
              placeholder="Github User Id"
              variant="filled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserId(e.target.value);
              }}
              mb={6}
              type="text"
              background="gray.600"
            />
            <Button mb={3} colorScheme="teal" type="submit">
              Visit Profile
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
