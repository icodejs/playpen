## Post

```bash
curl -X POST -H "Content-Type: application/json" http://playpen.herokuapp.com/bankroll -d '
{
    "rate":400,
    "startTime":9,
    "endTime":17:30
}
'
```

## Response

```json
{
  "today": "341.89",
  "month": "2,741.89",
  "dayEnded": false,
  "time": "15:50:16 GMT+0000 (UTC)"
}
```
