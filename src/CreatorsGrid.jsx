import { CreatorCard } from "./CreatorCard";
import "./CreatorsGrid.css";

export function CreatorsGrid({ creators, onDonate, connected }) {
  return (
    <div className="creators-container">
      <div className="creators-header">
        <h1 className="creators-title">Support Amazing Creators</h1>
        <p className="creators-subtitle">
          Pin your favorite peers and support their work with STX
        </p>
      </div>

      <div className="creators-grid">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onDonate={onDonate}
            connected={connected}
          />
        ))}
      </div>
    </div>
  );
}
