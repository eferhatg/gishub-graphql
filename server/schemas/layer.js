
const Layer = `
type Layer {
  id: Int
  clientId: Int
  categoryId: Int
  name: String
  type: String
  icon: String
  createdAt: Date
  features: [Feature]
  brief: [LayerBrief]
}
`;
export {Layer};
