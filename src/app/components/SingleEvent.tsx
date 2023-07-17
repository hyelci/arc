import { EventItem } from "../../types/eventTypes";

interface Props {
  event: EventItem;
}

const SingleEvent = ({ event }: Props) => {
  return (
    <div className="event">
      <img src={event.images.desktop} alt="" />
      <h2>{event.title}</h2>
      {/* <p>{event.description}</p> */}
      <div
        dangerouslySetInnerHTML={{
          __html: decodeURIComponent(event.description),
        }}
      />
    </div>
  );
};

export default SingleEvent;
