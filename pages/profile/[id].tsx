import { Flex, Image, List, ListIcon, ListItem } from "@chakra-ui/react";
import { FC, useState } from "react";
import Card from "../../components/card";
import Pagination from "../../components/pagination";
import config from "../../services/config.json";
import { ProfileProps } from "../../utils/mentors.interface";

const profile: FC<ProfileProps> = ({ userProfile, repositories }) => {
  const [repo, setRepo] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = repositories.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Flex
      height="100vh"
      alignItems="flex-start"
      justifyContent="flex-start"
      background="blackAlpha.900"
    >
      <div
        className="container mt-5"
        style={{
          background: "gray",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Flex direction="column">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={userProfile.avatar_url}
            alt={userProfile.name}
          />
          <List spacing={3} mt={3}>
            {userProfile.bio ? (
              <ListItem>
                <ListIcon color="green.500" />
                Bio : {userProfile.bio}
              </ListItem>
            ) : (
              ""
            )}
            <ListItem>
              <ListIcon color="green.500" />
              FullName : {userProfile.name}
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              UserName : {userProfile.login}
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              Followers : {userProfile.followers}
            </ListItem>
            {userProfile.location ? (
              <ListItem>
                <ListIcon color="green.500" />
                Location : {userProfile.location}
              </ListItem>
            ) : (
              ""
            )}
            {userProfile.blog ? (
              <ListItem>
                <ListIcon color="green.500" />
                Blog : {userProfile.blog}
              </ListItem>
            ) : (
              ""
            )}
          </List>
        </Flex>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <h3>Repositories</h3> */}
          <div className="list-group">
            {currentPosts &&
              currentPosts.map((repository: any) => (
                <Card Name={repository.full_name} key={repository.length} />
              ))}
          </div>
          <Pagination
            postPerPage={postsPerPage}
            totalPosts={repositories.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Flex>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await fetch(`${config.api_v1}/users/${id}`);
  const userProfile = await res.json();
  const res2 = await fetch(`${config.api_v1}/users/${id}/repos`);
  const repositories = await res2.json();

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: { userProfile, repositories },
    };
  }
}

export default profile;
