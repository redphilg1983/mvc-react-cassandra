Before you start the application, please open both CassandraTableSetup.js and CassandraDataSetup.js.

Update contactPoints for the ip address of your cassandra node.  Save both files.

Open powershell and navigate to the film-tv-game project folder.

Type the following into powershell 'node CassandraTableSetup.js'.  This will setup your table to use in cassandra.

Now type 'node CassandraDataSetup.js'.  This will add some static data to your database.  If this fails the first time, please try again.

Now in the Admin project, open the FilmTVGameController and update that endpoint.  Do the same in the film-tv-game project with both of those controllers.

You should now be good to run both projects.