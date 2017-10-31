import {
    ElementSchemaRegistry,
    ResourceLoader
} from '@angular/compiler';

import { 
    COMPILER_OPTIONS,
    InjectionToken,
    MissingTranslationStrategy,
    Sanitizer,
    StaticProvider,
    ViewEncapsulation
} from '@angular/core';

import {
    FileSystemResourceLoader,
    TitaniumElementSchemaRegistry
} from '../compiler';

import {
    RootViewService,
    ROOT_VIEW_SERVICE
} from '../renderer';

import {
    ELEMENT_REGISTRY,
    TitaniumElementRegistry
} from '../vdom';

import { TitaniumSanitizer } from './TitaniumSanitizer';

export const COMMON_PROVIDERS = [
    { provide: RootViewService, useClass: RootViewService, deps: []},
    { provide: ROOT_VIEW_SERVICE, useExisting: RootViewService},
    { provide: TitaniumElementRegistry, useClass: TitaniumElementRegistry, deps: []},
    { provide: ELEMENT_REGISTRY, useExisting: TitaniumElementRegistry},
    { provide: Sanitizer, useClass: TitaniumSanitizer, deps: [] }
];

export const TITANIUM_COMPILER_PROVIDERS = [
    {
        provide: COMPILER_OPTIONS,
        useValue: {
            providers: [
                { provide: ResourceLoader, useClass: FileSystemResourceLoader, deps: [] },
                { provide: ElementSchemaRegistry, useClass: TitaniumElementSchemaRegistry, deps: [] },
            ]
        },
        multi: true
    },
];