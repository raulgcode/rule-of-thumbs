import user from "@testing-library/user-event";
import { cleanup, screen } from "@testing-library/react";
import { render } from "../testUtil";
import Home from "./Home";

window.alert = jest.fn();

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render", async () => {
    render(<Home />);
    const card = await screen.findByText("Greta Thumberg");
    expect(card).toBeInTheDocument();
  });

  it.each([["positive"], ["negative"]])(
    "should highlight button %s on click",
    async (voteType) => {
      render(<Home />);
      const [voteButton] = await screen.findAllByLabelText(
        `button-vote-${voteType}`
      );
      user.click(voteButton);
      expect(voteButton).toHaveClass("vote-selected");
    }
  );

  it('"Vote Now" button should be disabled if button up/down is not selected', async () => {
    render(<Home />);
    const [voteButton] = await screen.findAllByText(/vote now/i);
    expect(voteButton).toBeDisabled();
  });

  it.each([["positive"], ["negative"]])(
    'Should enable "Vote Now" Button when button %s is selected',
    async (voteType) => {
      render(<Home />);

      const [voteTypeButton] = await screen.findAllByLabelText(
        `button-vote-${voteType}`
      );
      user.click(voteTypeButton);
      const [voteButton] = await screen.findAllByText(/vote now/i);
      expect(voteButton).toBeEnabled();
    }
  );

  it.each([["positive"], ["negative"]])(
    'should show success message on click "Vote Now"',
    async (voteType) => {
      render(<Home />);
      const [voteTypeButton] = await screen.findAllByLabelText(
        `button-vote-${voteType}`
      );
      user.click(voteTypeButton);
      const [voteNowButton] = await screen.findAllByText(/vote now/i);
      user.click(voteNowButton);
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Thank you for your vote!");
    }
  );

  it('should show "Vote again" button on click "Vote Now"', async () => {
    render(<Home />);
    const [voteTypeButton] = await screen.findAllByLabelText(
      "button-vote-positive"
    );
    user.click(voteTypeButton);
    const [voteNowButton] = await screen.findAllByText(/vote now/i);
    user.click(voteNowButton);
    const [voteAgainButton] = await screen.findAllByText(/vote again/i);
    expect(voteAgainButton).toBeInTheDocument();
  });

  it('should show "Vote Now" button on click "Vote Again"', async () => {
    render(<Home />);
    const [voteTypeButton] = await screen.findAllByLabelText(
      "button-vote-positive"
    );
    user.click(voteTypeButton);
    const [voteNowButton] = await screen.findAllByText(/vote now/i);
    user.click(voteNowButton);
    const [voteAgainButton] = await screen.findAllByText(/vote again/i);
    user.click(voteAgainButton);
    const [voteNowButtonRerendered] = await screen.findAllByText(/vote now/i);
    expect(voteNowButtonRerendered).toBeInTheDocument();
  });

  it('should update gauge bar on click "Vote Now"', async () => {
    render(<Home />);
    let [positiveBarNumber] = await screen.findAllByText("30%");

    expect(positiveBarNumber).toBeInTheDocument();

    const [voteTypeButton] = await screen.findAllByLabelText(
      "button-vote-positive"
    );

    user.click(voteTypeButton);
    const [voteNowButton] = await screen.findAllByText(/vote now/i);
    user.click(voteNowButton);
    [positiveBarNumber] = await screen.findAllByText("30.69%");

    expect(positiveBarNumber).toBeInTheDocument();
    expect(positiveBarNumber.innerHTML).toBe("30.69%");
  });

  it("should change to grid view when screen width is less than 768px", async () => {
    render(<Home />);
    global.innerWidth = 600;
    global.dispatchEvent(new Event("resize"));
    const homeWrapper = await screen.findByTestId("home-wrapper");
    expect(homeWrapper).toHaveClass("grid");
  });

  it("should default view if screen width is >= 768px", async () => {
    render(<Home />);
    global.innerWidth = 800;
    global.dispatchEvent(new Event("resize"));
    const homeWrapper = await screen.findByTestId("home-wrapper");
    expect(homeWrapper).toHaveClass("grid");
  });

  it("should change List View on select List in dropdow", async () => {
    render(<Home />);
    const viewSelector = await screen.findByTestId("view-selector");
    user.selectOptions(viewSelector, "list");
    const homeWrapper = await screen.findByTestId("home-wrapper");
    expect(homeWrapper).toHaveClass("list");
  });
});
