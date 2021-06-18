import {
	ComponentFactoryResolver,
	Injectable,
	Inject,
	ComponentRef,
	Component,
	Type,
	ViewContainerRef
} from '@angular/core';

@Injectable()
export class TemplateService {

	rootViewContainer: any

	constructor(
		@Inject(ComponentFactoryResolver)
		public factoryResolver: ComponentFactoryResolver
	) {

	}

	setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
		this.rootViewContainer = viewContainerRef
	}

	loadTemplate(template: Type<Component>) {
		this.rootViewContainer.clear()
		const component: ComponentRef<Component> = this.factoryResolver
			.resolveComponentFactory(template)
			.create(this.rootViewContainer.parentInjector)
		this.rootViewContainer.insert(component.hostView)
		window.scrollTo(0, 0)
	}
}
