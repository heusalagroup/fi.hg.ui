# @sendanor/ui

This is a meta package for related UI resources:

| Repository                                                           | Description                                                             | Expected relative path | Required                    |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------- | --------------------------- |
| [@sendanor/typescript](https://github.com/sendanor/typescript)       | Our core TypeScript library                                             | `nor/ts`               | Yes                         |
| [@sendanor/ui-services](https://github.com/sendanor/ui-services)     | Our core UI services for frontend environments. *ReactJS not required.* | `nor/ui/services`      | Required by `ui-components` |
| [@sendanor/ui-styles](https://github.com/sendanor/ui-styles)         | Our UI styles                                                           | `nor/ui/styles`        | Required by `ui-components` |
| [@sendanor/ui-components](https://github.com/sendanor/ui-components) | Our UI components for ReactJS                                           | `nor/ui/components`    | No                          |
| [@sendanor/pipeline](https://github.com/sendanor/pipeline)           | Our core pipeline library                                               | `nor/pipeline`         | Required by `ui-form`       |
| [@sendanor/ui-form](https://github.com/sendanor/ui-form)             | Shared resources for our From App's frontend and backend                | `nor/ui/form`          | No                          |
| [@sendanor/matrix](https://github.com/sendanor/matrix)               | Our core Matrix.org library                                             | `nor/matrix`           | No                          |

We use this style so that you can opt-in which parts of the UI library you want to introduce to your project and/or fork and modify parts of them (like `ui-styles` for example).

### MIT Licensed

### Small dependency footprint

The only 3rd party dependency we have is for [Lodash library](https://lodash.com/).

### Commercial support

For commercial support check [Sendanor's organization page](https://github.com/sendanor).
