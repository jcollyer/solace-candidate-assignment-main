## Things I did not get to...

### Implement full text search or vector search
With the time permitted, I decided to implement a very simple search strategy that might not scale with very large databases. If given more time, I would have opted to use a **full text search** or even a **vector search** to more easily handle large datasets.

### Add pagination query param to URL
Currently, there are no URL updates when the pagination changes. I would like to add query params to the URL so the app can keep track of what page you are on with a refresh/new session.

### Update packages
I noticed the **Drizzle packages** were a major version behind. That did not cause issues in development, but I would want to keep all libraries up to date in production.

### Other improvements with more time
- [ ] Add table column sort functionality
- [ ] Optimize mobile page size and responsive design
- [ ] Add debounce to `/api/advocates` endpoint for better performance

