import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";
import { formatStatValue } from "../utils/format";
import repositories from "./mockData/repositories";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.queryAllByTestId("repositoryItem");

      repositories.edges.forEach(({ node: repository }, index) => {
        const repositoryItem = repositoryItems[index];

        expect(repositoryItem).toHaveTextContent(repository.fullName);
        expect(repositoryItem).toHaveTextContent(repository.description);
        expect(repositoryItem).toHaveTextContent(repository.language);
        expect(repositoryItem).toHaveTextContent(formatStatValue(repository.forksCount));
        expect(repositoryItem).toHaveTextContent(formatStatValue(repository.stargazersCount));
        expect(repositoryItem).toHaveTextContent(formatStatValue(repository.ratingAverage));
        expect(repositoryItem).toHaveTextContent(formatStatValue(repository.reviewCount));
      });
    });
  });
});
