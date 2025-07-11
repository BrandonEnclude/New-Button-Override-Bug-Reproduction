# New-Button-Override-Bug-Reproduction

Reproduces a bug recorded in [Known Issues](https://help.salesforce.com/s/issue?id=a028c00000gAwnpAAC)

## Reproduction

1. Run `cci flow run dev_org --org dev` to deploy this project.
2. Run `cci org browser dev` to open the org in your browser.
3. Navigate to the `New Button Override Bug` app
4. Create a `Parent Object` record
5. From the `Parent Object`'s record page, click the `New` button for each related list

## Result

### Working Child Record (**with** active record types)
The passed state contains an "additionalParams" key, crucially including `lkid` (Lookup ID) data. This makes it possible to identify the relationship field from the new button override page.
```json
{
    "state": {
      "recordTypeId": "012G5000003kw5hIAA",
      "additionalParams": "CF00NG500000FW6jC=PO-0000&CF00NG500000FW6jC_lkid=a01G500000llVV8&",
      "inContextOfRef": "1.eyJ0eXBlIjoic3RhbmRhcmRfX3JlY29yZFBhZ2UiLCJhdHRyaWJ1dGVzIjp7InJlY29yZElkIjoiYTAxRzUwMDAwMGxsVlY4SUFNIiwiYWN0aW9uTmFtZSI6InZpZXciLCJvYmplY3RBcGlOYW1lIjoiUGFyZW50X09iamVjdF9fYyJ9LCJzdGF0ZSI6e319",
      "count": "2"
    }
}
```

### Buggy Child (**without** active record types)
The passed state contains no "additionalParams" key.
```json
{
    "state": {
      "inContextOfRef": "1.eyJ0eXBlIjoic3RhbmRhcmRfX3JlY29yZFBhZ2UiLCJhdHRyaWJ1dGVzIjp7Im9iamVjdEFwaU5hbWUiOiJQYXJlbnRfT2JqZWN0X19jIiwicmVjb3JkSWQiOiJhMDFHNTAwMDAwbGxWVjhJQU0iLCJhY3Rpb25OYW1lIjoidmlldyJ9LCJzdGF0ZSI6e319",
      "count": "1"
    }
}

```
