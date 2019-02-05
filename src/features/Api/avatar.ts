const userAvatars: {
  username: string;
  avatarPath: string;
}[] = [];

const AVATAR_BASE_URL = ''; // TODO
const AVATAR_SIZE = '300';
const AVATAR_API_ENDPOINT = `${AVATAR_BASE_URL}/${AVATAR_SIZE}`;

export const getUserAvatar = async (username: string) => {
  const avatar = userAvatars.find(avs => avs.username === username);
  if (avatar) {
    return avatar.avatarPath;
  }
  const AVATAR_URL = `${AVATAR_API_ENDPOINT}/${username}.png`;
  return Promise.resolve(require('./avatar.png'));
};
