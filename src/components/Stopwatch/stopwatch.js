import { useState } from 'react';
import { interval, fromEvent } from 'rxjs';
import { takeUntil, buffer, debounceTime, map, filter } from 'rxjs/operators';
import Button from '../Button/button';
import styles from './stopwatch.module.css';

export default function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const StartStopWatch = () => {
    const click = fromEvent(document.getElementById('Wait'), 'click');
    const doubleClick = click.pipe(
      buffer(click.pipe(debounceTime(300))),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    );
    doubleClick.subscribe(() => setIsActive(false));
    const subscription = interval(1000).pipe(
      takeUntil(
        fromEvent(document.getElementById('Stop') || document.getElementById('Reset'), 'click'),
      ),
      takeUntil(doubleClick),
    );
    subscription.subscribe(() => setMs(state => state + 1000));
  };

  const timerStart = () => {
    if (isActive) {
      return;
    }
    StartStopWatch();
    setIsActive(true);
  };

  const timerReset = () => {
    if (ms === 0) {
      return;
    }
    setMs(0);
    timerStart();
  };

  const timerStop = () => {
    setMs(0);
    setIsActive(false);
  };

  return (
    <>
      <div className={styles.container}>
        <span className={styles.timer}>{new Date(ms).toISOString().slice(11, 19)}</span>
        <div>
          <Button onClick={timerStart}>Start</Button>
          <Button>Wait</Button>
          <Button onClick={timerReset}>Reset</Button>
          <Button onClick={timerStop}>Stop</Button>
        </div>
      </div>
    </>
  );
}
