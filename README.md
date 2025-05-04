# 🧪 Optici - Test Selector GitHub Action

This GitHub Action queries OptiCI to determine which tests to run for a pull request. This requires a subscription to OptiCI.

---

## 🚀 Usage

Sign up to OptiCI and get an API Key. Add this API Key to your Secrets.

TODO Workflow

Add this action to your GitHub Actions workflow:

```yaml
- name: Get tests
  uses: optici/optici-select-tests@main
  with:
    api_key: ${{ secrets.OPTICI_API_KEY }}
```

This action outputs a JSON array of objects. Each object key is a module name and their corresponding value is an array of test names.

Example output:

```json
[
    {
        "module": "Module1",
        "tests": [
            "TestNamespace.TestClass1.TestMethod1",
            "TestNamespace.TestClass1.TestMethod2"
        ]
    },
    {
        "module": "Module2",
        "tests": [
            "TestNamespace.TestClass2.TestMethod1",
            "TestNamespace.TestClass3.TestMethod5"
        ]
    }
]
```

You can store the result and process it however you like:

```yaml
- name: Save test groups
  run: |
    echo '${{ steps.test_selector.outputs.tests }}' > tests.json
    cat tests.json
```

Check out the [demo](.github/workflows/demo.yml) workflow for an example.

---

## 🧾 Inputs

| Name         | Required | Description                                                  |
|--------------|----------|--------------------------------------------------------------|
| `api_key`    | ✅ Yes    | API key to authenticate with OptiCI                       |

---

## 🎯 Outputs

| Name    | Description                                                     |
|---------|-----------------------------------------------------------------|
| `tests` | A JSON array of objects mapping module names to arrays of tests |

---

## 🛠 Github Enterprise Setup (GHES)

If you're using **GitHub Enterprise Server**, you must:
1. Mirror this repo into your internal GHES instance.
2. Reference it as:
```yaml
- uses: your-org/optici-select-tests@main
```
3. Ensure outbound HTTP access to OptiCI is allowed (TODO url)

---

## 📄 License

MIT
