babel server/ -d dist/ --presets es2015,stage-2
git add dist/
git commit -m 'Build'
git push heroku master
