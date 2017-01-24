import path from 'path';
import fs from 'fs';
import randToken from 'rand-token';

import errors from 'services/errors';

import Photo from 'models/photo';

import applicationConfig from 'config/application';

module.exports = function(req, res, next) {
  if (!req.files) {
    next(new errors.BadRequest('No files were uploaded.'));
    return;
  }

  const file = req.files.file;
  const newFileName = randToken.generate(32).toLowerCase();
  const uploadDirectory = applicationConfig.privateUploadDirectory;
  const extension = path.extname(file.name);

  const filePath = path.resolve(`${uploadDirectory}/${newFileName}${extension}`);

  fs.writeFile(filePath, file.data, (err) => {
    if (err) {
      next(err);
      return;
    }

    const currentUser = req.user;

    const newPhoto = new Photo({
      url: `/${uploadDirectory}/${newFileName}${extension}`,
      name: `${newFileName}${extension}`,
      user: currentUser.id
    });

    if (!currentUser.photos.length) {
      currentUser.profilePhoto = newPhoto;
    }

    currentUser.photos.push(newPhoto);

    const savingNewPhoto = newPhoto.save();
    const savingCurrentUser = currentUser.save();
    Promise.all([savingNewPhoto, savingCurrentUser]).then(([newSavedPhoto]) => {
      res.status(201);
      res.send({
        photo: newSavedPhoto.toObject()
      });
    });
  });
};
