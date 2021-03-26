import React, { useContext, useEffect, useRef } from 'react';
import {
  snapshotHistoryContext,
  componentTreeHistoryContext,
} from '../components/App';
import Snapshot from '../components/Snapshot/Snapshot';
//Testing:
import { prevSnapMock } from '../../app/mock/mockStateDiff';
import { componentAtomTreeMock } from '../../app/mock/mockComponentTree';

function SnapShotContainer(): JSX.Element {
  const { snapshotHistory, setSnapshotHistory } = useContext<any>(
    snapshotHistoryContext
  );
  const { componentTreeHistory, setComponentTreeHistory } = useContext<any>(
    componentTreeHistoryContext
  );
  const snapshotEndRef = useRef<HTMLDivElement>(null);

  //Testing start:
  const handleNewData = () => {
    const copy = { ...prevSnapMock };
    copy.resetSquaresAtom = { ...copy.resetSquaresAtom };
    copy.resetSquaresAtom.contents = Math.floor(Math.random() * 10000);
    setSnapshotHistory((prevState: any) => [...prevState, copy]);

    const copy2 = { ...componentAtomTreeMock };
    copy2.name = `${Math.floor(Math.random() * 10000)}`;
    setComponentTreeHistory((prevState: any) => [...prevState, copy2]);
  };
  useEffect(() => console.log('componentTreeHistory: ', componentTreeHistory), [
    componentTreeHistory,
  ]);
  //Testing end

  useEffect(() => scrollToBottom(), [snapshotHistory]);

  const scrollToBottom = (): void => {
    snapshotEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snapShotsContainer">
      <div className="header">
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '17px',
            paddingTop: '0px',
            marginTop: '10px',
          }}
        >
          ATOMIC{' '}
        </p>
        <div>
          <button onClick={handleNewData} style={{ marginBottom: '15px' }}>
            ADD SnapShot
          </button>
        </div>
      </div>
      <div className="snapshotList">
        {snapshotHistory.map((snapshot: any, idx: number) => (
          <Snapshot key={idx} idx={idx} snapshot={snapshot} />
        ))}
      </div>
      <div ref={snapshotEndRef} />
    </div>
  );
}

export default SnapShotContainer;