import React, { useState } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { useFetchRemoteData, err, ok } from './remoteData';

const TestRD: React.FC<{ swrKey: string; willReject?: boolean }> = ({
  swrKey,
  willReject = false,
}) => {
  const [startRequesting, setStartRequesting] = useState(false);
  const { status } = useFetchRemoteData(startRequesting ? swrKey : null, () => {
    return willReject ? Promise.resolve(err('Err')) : Promise.resolve(ok('Ok'));
  });

  return (
    <div>
      <button onClick={() => setStartRequesting(true)}>Request</button>
      {status.type === 'NotAsked' && <p>Init</p>}
      {status.type === 'Loading' && <p>Loading</p>}
      {status.type === 'Failure' && <p>{status.error}</p>}
      {status.type === 'Success' && <p>{status.value}</p>}
    </div>
  );
};

test('initially NotAsked', () => {
  render(<TestRD swrKey="test1" />);
  expect(screen.getByText('Init')).toBeInTheDocument();
});

test('shows loading and then the value on success', async () => {
  render(<TestRD swrKey="test2" />);

  fireEvent.click(screen.getByText('Request'));

  expect(screen.getByText('Loading')).toBeInTheDocument();
  await screen.findByText('Ok');
  expect(screen.getByText('Ok')).toBeInTheDocument();
});

test('shows loading and then the error message on failure', async () => {
  render(<TestRD swrKey="test3" willReject />);

  fireEvent.click(screen.getByText('Request'));

  expect(screen.getByText('Loading')).toBeInTheDocument();
  await screen.findByText('Err');
  expect(screen.getByText('Err')).toBeInTheDocument();
});
