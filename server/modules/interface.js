var interface = {
  implements: function implement(target, ...interfaces) {
    const
      // interfaces are uinique and stored as such
      set = new Set(),
      // every interface will augment the new proto
      defineProperties = (proto, iface) => {
        if (!set.has(iface)) {
          set.add(iface);
          Object.defineProperties(
            proto,
            Object.getOwnPropertyDescriptors(iface)
          );
        }
        return proto;
      }
    ;
    // insert between the target and its __proto__ ...
    return Object.setPrototypeOf(
      target,
      // ... a "man-in-the-middle" like object ...
      interfaces.reduce(
        (proto, iface) => {
          // ... configured through all descriptors
          // retrieved from each interface and also
          // from their possibly implemented interfaces too ...
          if (implement.symbol in iface)
            Array.from(iface[implement.symbol])
              .forEach(iface => defineProperties(proto, iface));
          return defineProperties(proto, iface);
        },
        // ... without losing original inheritance ...
        Object.create(
          Object.getPrototypeOf(target),
          {
            [implement.symbol]: {
              configurable: true,
              // ... making analysis at runtime straight forward
              value: set
            }
          }
        )
      )
    );
  }
}

exports.interface = interface;
