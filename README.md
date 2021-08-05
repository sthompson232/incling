# incling

To run: start a VE install dependancies in requirements.txt with pip install -r requirements.txt, then run django on localhost:8000, make sure you are in the backend directory
start react with yarn install, and then yarn start, make sure you are in the frontend directory. 

to continue, add security checks and safeguards in backend if it fails, check payload is correct etc and if any errors returned then they are handled on the frontend with error messages

improved the ordering system to something more intelligent then selecting a number!

fix default select type when editing existing task/tile

potential improvements: instead of fetching all tiles upon change, fetch just the modified data. could store data in redux/react context