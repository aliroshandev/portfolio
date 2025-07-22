import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(500, style({opacity: 1, transform: 'translateY(0)'}))
  ])
])

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-20%)'}),
    animate('.25s .25s ease-out', style({opacity: '*', transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({ opacity: 1,  transform: '0', animationFillMode: 'forwards' }),
    animate('.25s ease-in', style({opacity: '1', transform: 'translateY(0)'}))
  ]),
]);
