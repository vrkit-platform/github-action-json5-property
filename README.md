
# github-action-json5-property

![Banner image showing successfully executed GitHub Action](banner.png)

Get a specified property of a json file.

## Usage

Use the action inside your workflow yaml file like this:

```yaml
...
- name: get version
    id: version
    uses: vrkit-platform/github-action-json-property@release
    with: 
        path: 'package.json'
        prop_path: 'version'
- run: echo ${{steps.version.outputs.prop}} 
...

```

Get a nested property value with dot separated prop_path

```yaml
...
- name: get nested property
    id: format_script
    uses: vrkit-platform/github-action-json-property@release
    with: 
        path: 'package.json'
        prop_path: 'scripts.format'
- run: echo ${{steps.format_script.outputs.prop}} 
...

```

Get a property value as string 

```yaml
...
- name: get nested property
    id: format_script
    uses: vrkit-platform/github-action-json-property@release
    with: 
        path: 'package.json'
        prop_path: 'scripts.format'
- run: echo ${{steps.format_script.outputs.propStr}} 
...

```
