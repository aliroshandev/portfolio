import {Directive, ElementRef, inject, input, OnChanges, PLATFORM_ID, Renderer2, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[appLoadingSkeleton]'
})
export class LoadingSkeletonDirective implements OnChanges {

  readonly #elementRef = inject(ElementRef<HTMLElement>);
  readonly #renderer2 = inject(Renderer2);
  readonly #platformId: Object = inject(PLATFORM_ID);

  status = input.required<boolean>();

  htmlElement = isPlatformBrowser(this.#platformId) ? this.#elementRef.nativeElement : null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.htmlElement?.classList.toggle('skeleton', !!changes['status'].currentValue);
    }
  }

}
