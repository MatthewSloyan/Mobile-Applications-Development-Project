import { NgModule } from '@angular/core';
import { SocialMediaComponent } from './social-media/social-media';
import { MorePopoverComponent } from './more-popover/more-popover';
@NgModule({
	declarations: [SocialMediaComponent,
    MorePopoverComponent],
	imports: [],
	exports: [SocialMediaComponent,
    MorePopoverComponent]
})
export class ComponentsModule {}
