# renfe-ticket-alarm

A tiny app that sends you an email, when a certain Renfe ticket is available to purchase.



# How to use renfe.js casperjs script:

From project root;
```
casperjs src/renfe.js --from="BARCELONA (todas)" --to="PAMPLONA" --date="11/06/2016"
```


returns something like this:
{"status":"ok","from":"BARCELO","to":"PAMPLO","fecha":"11/06/2016","datesMatches":true,"thereAreTrains":false}

datesMatches: Sometimes Renfe changes the date, it it thinks there is an error in provided date. I.e. enter 20/02/2045 and Renfe will return trains for 20/02/<CURRENT_YEAR>
thereAreTrains: Indicates if there are tickets available to buy at this moment.
