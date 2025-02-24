import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations'

export const fadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          opacity: 1,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('100ms ease-out', style({ opacity: 0, filter: 'blur(8px)', transform: 'scale(0.99)' }))],
        {
          optional: true,
        }
      ),
      query(':enter', [animate('200ms 200ms ease-out', style({ opacity: 1 }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
])

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-3px)' }),
    animate('250ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('250ms ease-in-out', style({ opacity: 0 })),
  ]),
])