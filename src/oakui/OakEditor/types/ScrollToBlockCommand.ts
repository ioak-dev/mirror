import { BehaviorSubject } from 'rxjs';

export const ScrollToBlockCommand = new BehaviorSubject<ScrollToBlockCommandType>(
  { blockId: '' }
);

export interface ScrollToBlockCommandType {
  blockId: string;
}
