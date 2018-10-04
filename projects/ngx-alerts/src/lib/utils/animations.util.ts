import {animate, state, style, transition} from '@angular/animations';

export class AnimationsUtil {

  public static animationDefinition(position: string) {
    const tranlateX = position === 'right' ? '100%' : '-100%';
    return [
      state('shown', style({transform: 'translateX(0)', opacity: 0.8})),
      transition(':enter', [
        style({transform: `translateX(${tranlateX})`, opacity: 0}),
        animate('300ms 100ms ease', style({transform: 'translateX(0)', opacity: 0.8}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 0.8}),
        animate('200ms ease-out', style({transform: `translateX(${tranlateX})`, opacity: 0}))
      ])];
  }

}
