import { useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, addVote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";
import queryClient from "./queryClient";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const notificationDispatch = useNotificationDispatch();

  const voteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notificationDispatch({
        type: "SHOW",
        payload: "Vote added successfully!",
      });
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return (
      <div style={{ fontWeight: "bold", fontSize: "2em" }}>
        Anecdote service is not available due server issues
      </div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
