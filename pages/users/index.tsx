import { useAuth0 } from "@auth0/auth0-react";
import DashboardHeader from "../../components/DashboardHeader";
import { GetServerSideProps } from "next";
import { sanityClient } from "../../sanity";
import { User } from "../../typings";
import UserList from "../../components/UserList";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";

interface UsersProps {
  users: Array<User>;
}

const Users = ({ users }: UsersProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <PageNotFound />;
  }

  return (
    isAuthenticated && (
      <>
        <div className="bg-neon-blue-50">
          <DashboardHeader />
          <header className="border-y border-neon-blue-700 py-1 md:border-y-0 md:border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-center text-4xl font-semibold text-neon-blue-900 md:text-left">
                Users
              </h1>
            </div>
          </header>
        </div>
        <Container className=" bg-neon-blue-50 pt-3">
          <section className="  flex flex-col justify-evenly space-y-3  md:mx-0 md:flex-row md:space-y-0 md:space-x-3 ">
            {users.map((user) => (
              <UserList key={user.email} user={user} />
            ))}
          </section>
        </Container>
      </>
    )
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "user"]{
    _id,
    email,
    image,
    gamesPlayed,
    supporter,
    vip
  }`;
  const users = await sanityClient.fetch(query);

  return {
    props: {
      users,
    },
  };
};
